from flask import Flask
from flask import request
from flask_cors import CORS
import json

import math
import pandas as pd

app = Flask(__name__)

# The below CORS policy enables requests from the frontend app. Setting the value
# to '*' is dangerous since it will allow any app to access this API. When deployed
# to GitHub pages, only include CityFinder's URL below.
CORS(app, resources={r"/*": {"origins": "*"}}) # Temporarily open to all domains.


def calculate_score(df, row, PCA_relevance, user_importance, gold_dict):
    score = 0
    for var in df.columns:
        if var not in user_importance or math.isnan(row[var]):
            continue

        if var in gold_dict:
            # Handling 'gold' type variables
            diff = abs(gold_dict[var]['given_value'] - row[var])
            normalized_diff = diff / gold_dict[var]['var_range']
            score += (1 - normalized_diff) * PCA_relevance.get(var, 0) * user_importance.get(var, 0)
        else:
            # Handling 'norm' type variables
            score += row[var] * PCA_relevance.get(var, 0) * user_importance.get(var, 0)
    return score


def suggest_cities(user_importance):
    # Read in city data.
    df = pd.read_csv('/home/jyoshiok/mysite/CityMaster1.5.csv')

    # PCA dict
    df_pca = pd.read_csv('/home/jyoshiok/mysite/PCA_Results1.2.csv')
    pca_scores = df_pca.to_dict('list')
    for key, val in pca_scores.items():
        pca_scores[key] = val[0]

    # User preferences.
    for key, val in user_importance.items():
        user_importance[key] = int(val)

    gold_dict = {
        'VALUEH_median': {
            'given_value': user_importance['VALUEH_median'],
            'var_range': 9999999 - 175000
        },
        'AGE_mean': {
            'given_value': user_importance['AGE_mean'],
            'var_range': 60 - 31
        },
        'Annual_Precip': {
            'given_value': user_importance['Annual_Precip'],
            'var_range': 99 - 0
        },
        'Annual_Snowfall': {
            'given_value': user_importance['Annual_Snowfall'],
            'var_range': 220 - 0
        },
        'Winter_Temp': {
            'given_value': user_importance['Winter_Temp'],
            'var_range': 72 - 4
        },
        'Summer_Temp': {
            'given_value': user_importance['Summer_Temp'],
            'var_range': 88 - 56
        }
    }

    city_scores = {index: calculate_score(df, row, pca_scores, user_importance, gold_dict) for index, row in df.iterrows()}

    # Sort cities by their scores in descending order
    sorted_cities = sorted(city_scores.items(), key=lambda x: x[1], reverse=True)

    output = []
    for i, city in enumerate(sorted_cities[:5]):
        output.append([df.iloc[city[0]]['city'], i+1])

    return output


@app.route('/', methods=['POST'])
def handle_request():
    post_data = request.json

    cities = suggest_cities(post_data)

    result = {'suggestions': cities}
    json_dump = json.dumps(result)
    return json_dump