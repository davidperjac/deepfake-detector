<br/>
<p align="center">
  <a href="https://github.com/davidperjac/react-wordle-clon">
    <img src="resources/logo.jpeg" alt="Logo" width="250" height="250">
  </a>

  <h3 align="center">Deepfake Detector</h3>

  <p align="center">
    A deepfake detector built using NextJS, FastAPI and Tensorflow
    <br/>
    <br/>
    <a href="https://deepfake-detector.vercel.app/">View Demo</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/davidperjac/react-wordle-clon?color=dark-green) ![Issues](https://img.shields.io/github/issues/davidperjac/react-wordle-clon) ![License](https://img.shields.io/github/license/davidperjac/react-wordle-clon)

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)

## About The Project

Deepfake Detector is an AI course final project that consists of building a deep learning model that can detect deepfake photos by using AI techniques. The model was built using a Convolutional Neural Network (CNN) and trained using the [OpenForensics](https://zenodo.org/records/5528418#.YpdlS2hBzDd) dataset. The dataset contains aproximately 191,000 images. The training set contains 140,000, the validation set contains 40,000 and the test set contains 11,000 images. The images are divided into two classes: real and fake.

<p align="center">
  <img src="resources/dataset.png" alt="Logo" height="250">
</p>

The model was built in Google Colab Pro with Tensorflow and Keras API. The trained model was saved as a .tf file and then used in a web service built with FastAPI. The web service was deployed to [Render](https://render.com/) and the client was built using NextJS and deployed to [Vercel](https://vercel.com/).

The model was trained using 20 epochs and achieved an accuracy of 0.91 and a loss of 0.2439 in the test set.

<p align="center">
  <img src="resources/loss.png" alt="Logo" width="350" height="350">
  <img src="resources/accuracy.png" alt="Logo" width="350" height="350">
</p>

## Built With

The technologies used for this project were:

- [NextJS](https://nextjs.org/) for the client
- [FastAPI](https://fastapi.tiangolo.com/) for the server
- [Tensorflow](https://www.tensorflow.org/) for the model

## Getting Started

To use this application, simply clone the repository, move into the client and server directories, install the dependencies, and start the development server. Here are the steps:

1. Clone the repo

```sh
git clone https://github.com/davidperjac/react-wordle-clon.git
```

### Client Installation

1. Move into the client directory

```sh
cd client
```

2. Install NPM packages

```sh
npm install
```

3. Start the development server

```sh
npm run dev
```

4. Open your web browser and go to `http://localhost:3000`

### Server Installation

1. Move into the server directory

```sh
cd server
```

2. Create a virtual environment

```sh
python3 -m venv venv
```

3. Activate the virtual environment

```sh
source venv/bin/activate
```

4. Install the requirements

```sh
pip install -r requirements.txt
```

5. Start the development server

```sh
uvicorn main:app --reload
```

## Usage

- Landing Page
  ![Screen Shot](resources/landing.png)

- Model Page
  ![Screen Shot](resources/model.png)

- Code Page
  ![Screen Shot](resources/code.png)

## Authors

Built with ❤️ by:

- **David Perez** - [David Perez](https://github.com/davidperjac)
- **Fernando Bucheli** - [Fernando Bucheli](https://github.com/ferbucheli)
- **David Bravo** - [David Bravo](https://github.com/davalbra)
