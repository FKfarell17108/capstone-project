#  🏷️ Klasifikasi Organik & Anorganik

##  📌 Tentang Proyek

Model ini dikembangkan untuk mengklasifikasikan data menjadi kategori **organik** dan **anorganik** berdasarkan fitur tabular.  
Model telah dilatih menggunakan Neural Network (Sequential Model) dan disimpan dalam format **`.pkl`** menggunakan **Joblib**, agar dapat digunakan sebagai REST API menggunakan Flask.

---

##  📂 Struktur Direktori

Berikut adalah struktur file dalam repository ini:

```
/
├── models/
│   ├── model.pkl           # Model dalam format Joblib
│   ├── model.h5            # Model dalam format Keras
│   ├── preprocessing.pkl   # Parameter preprocessing
├── notebooks/
│   ├── Model_Klasifikasi.ipynb   # Notebook pelatihan model
├── requirements.txt        # Daftar dependency Python
└── README.md               # Dokumentasi ini
```
---

## ⚙️ Instalasi & Persiapan

Sebelum menjalankan model, pastikan telah menginstal dependensi yang diperlukan.

1.  Buat virtual environment (Opsional):

    ```bash
    python -m venv venv
    source venv/bin/activate   # Mac/Linux
    venv\Scripts\activate      # Windows
    ```

2.  Instal dependensi:

    ```bash
    pip install -r requirements.txt
    ```

    Isi `requirements.txt`:

    ```
    numpy
    joblib
    tensorflow
    keras
    scikit-learn
    ```

3.  Pastikan file model.pkl berada di folder `models/`.

---

##  🚀 Cara Menggunakan Model

Saat ini model `.pkl` digunakan melalui Flask API yang berada di folder `API/`.

###  Namun jika ingin tes manual di Python:

```python
import numpy as np
import joblib

# Load model
model = joblib.load('Model/model.pkl')

# Contoh input data (HARUS sesuai dengan pelatihan)
sample_input = np.array([[0.5, 0.8, 0.3]])  # Jumlah fitur harus sesuai
prediction = model.predict(sample_input)

# Output
print("Predicted Label:", prediction)
```

---

## 📌 Contoh Input & Output

### 🔹  Input (JSON via API atau manual):

```bash
{
    "features": [0.5, 0.8, 0.3]
}
```

### 🔹  Output (API Response):

```bash
{
    "prediction": 0  // 0 = Organik, 1 = Anorganik
}
```

---

## ❗ Troubleshooting

1.  ❌ Model tidak bisa digunakan?
   
    ✔️ Pastikan path dan nama file `model.pkl` sudah sesuai.

2.  ❌ Error input shape tidak sesuai?

    ✔️ Pastikan jumlah fitur input sama dengan saat pelatihan (misal: 12288).

3.  ❌ Prediksi tidak akurat?

    ✔️ Pastikan preprocessing (normalisasi, scaling, dll) dilakukan jika memang digunakan saat pelatihan.

---

## 🏁 Kesimpulan

- ✅ Model ini digunakan melalui Flask API `(API/model_api.py)`.
- ✅ Format `.pkl` digunakan karena lebih mudah diintegrasikan via Python.
- ✅ Tidak perlu gunakan `.h5` dan `tfjs-node` di Node.js karena sudah digantikan dengan REST API.
- ✅ Preprocessing hanya diperlukan jika model dilatih dengan pipeline preprocessing.

---

##  Link Notebook

https://colab.research.google.com/drive/1gK8RAOlisLqzVyOgGLH4jzO0M7eKBas_?usp=sharing

Jika ada pertanyaan atau kendala, jangan ragu untuk menghubungi tim ML! 🚀
* farellkurniawan17108@gmail.com
* farelpunn@gmail.com

---

Dokumentasi ini dapat diperbarui jika ada perubahan pada model atau backend!
