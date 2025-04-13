from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import joblib
import os
from flask_cors import CORS


app = Flask( __name__ )
CORS(app)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, '..', 'model', 'model', 'model.pkl')
model = joblib.load(model_path)

def preprocess_image(file):
    image = Image.open(file).resize((64, 64))
    array = np.array(image) / 255.0
    array = array.flatten()
    return array.reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    image_array = preprocess_image(file)
    prediction = model.predict(image_array)
    label = int(prediction[0])
    return jsonify({"prediction": label})

if __name__ == '__main__':
    app.run(debug=True)
