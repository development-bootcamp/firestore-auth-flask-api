FROM python:3.8-buster

RUN mkdir /src
WORKDIR /src

ADD ./app /src/app
ADD ./requirements.txt /src

RUN pip install wheel
RUN pip install -r requirements.txt

ENV FLASK_APP="app"

ENTRYPOINT ["flask", "run", "--host=0.0.0.0", "--port=9000"]
