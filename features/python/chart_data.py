from pymongo import MongoClient
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from bson.objectid import ObjectId
# import sys
# 
# var = ''
# for v in sys.argv[1:]:
#     var = v
v = 'localhost:27017'
# v = 'touqeer:touqeer007@ds021663.mlab.com:21663/doyouthink'
client = MongoClient("mongodb://" + v)
db = client.studentsento
SIA = SentimentIntensityAnalyzer()
questions = db.questions.find()

for question in questions:
    questionId = question['_id']
    chartData = []
    pos = neu = neg = 0

    for comment in question['comments']:
        polarity = SIA.polarity_scores(comment['comment'])
        maxval = max(polarity, key=lambda key: polarity[key])
        if(maxval == 'neg'):
            neg = neg + 1
        elif(maxval == 'pos'):
            pos = pos + 1
        elif(maxval == 'neu'):
            neu = neu + 1

    chartData.append(neg)
    chartData.append(pos)
    chartData.append(neu)

    db.questions.update({'_id': ObjectId(questionId)},
                        {'$set': {'chartData': chartData}})
