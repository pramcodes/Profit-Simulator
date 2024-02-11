from flask import Flask, render_template, request, jsonify , send_file
import pandas as pd
from prophet import Prophet
import io
import matplotlib as plt
from scipy.stats import norm

def processing(df):
    df['Date'] = pd.to_datetime(df['Date'], format='%Y%m%d')
    frame = df.copy()
    frame.columns = ['ds', 'y']
    frame.head()
    m = Prophet(interval_width=0.95) 
    training_run = m.fit(frame)
    future = m.make_future_dataframe(periods=20, freq='D')
    forecast = m.predict(future)
    plot1 = m.plot(forecast,None,True,True,'time','profit')

    plot2 = m.plot_components(forecast)
    plot2_path = "static/temp_plot2.png"
    plot2.savefig(plot2_path)
    return plot1,plot2

def stats(df):
    profit_data = df['Profit']

    # Calculate mean and standard deviation
    mean_return = profit_data.mean()
    std_dev = profit_data.std()

    # Set confidence level
    confidence_level = 0.95

    # Find the Z-score
    z_score = norm.ppf(confidence_level)

    # Calculate Parametric VaR
    parametric_var = mean_return - (z_score * std_dev)

    return parametric_var


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/upload', methods=['POST','GET'])


def upload():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        csv_data = uploaded_file.read().decode('utf-8')
        # df = pd.read_csv(pd.compat.StringIO(csv_data))
        df = pd.read_csv(io.StringIO(csv_data))
        dataframe = df.copy()
        plot1 = processing(df)[0]
        plot2 = processing(df)[1]
        
        # Save the plot as a temporary file
        plot_path = "static/temp_plot.png"
        plot1.savefig(plot_path)

        var_value = stats(df)
        var_value = "Under normal market conditions and based on historical data, there is a 95% confidence that the maximum expected loss over the specified time period will be R" +  str(var_value)
        return render_template('dashboard.html', var_value=var_value)
    else:
        return "No file uploaded", 400  # Bad Request
    

if __name__ == '__main__':
    app.run(debug=True)




