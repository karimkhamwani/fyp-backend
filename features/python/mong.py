from pymongo import MongoClient
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from bson.objectid import ObjectId
# import sys
# var = ''
# for v in sys.argv[1:]:
#     var = v
v = 'localhost:27017'

client = MongoClient("mongodb://" + v)

db = client.studentsento
cursor = db.questions.find()
for document in cursor:
    lengthofcomments = 0
    compoundAveragePolarity = 0
    negAveragePolarity = 0
    posAveragePolarity = 0
    neuAveragePolarity = 0
    emoji = ""
    wholedocumentid = document['_id']
    for comments in document['comments']:
        lengthofcomments = len(document['comments'])
        document_id = document['_id']
        comment_id = comments['_id']
        sid = SentimentIntensityAnalyzer()
        sentence = comments['comment']
        polarity = sid.polarity_scores(sentence)
        for category in sorted(polarity):
            result = db.questions.update(
                {"_id": ObjectId(document_id),
                 "comments._id": ObjectId(comment_id)},
                {"$set": {"comments.$." + category: polarity[category]}})
            if(category == "compound"):
                compoundAveragePolarity = compoundAveragePolarity + \
                    polarity[category]
            if(category == "pos"):
                posAveragePolarity = posAveragePolarity + polarity[category]
            if(category == "neu"):
                neuAveragePolarity = neuAveragePolarity + polarity[category]
            if(category == "neg"):
                negAveragePolarity = negAveragePolarity + polarity[category]

    if lengthofcomments > 0:
        compoundAveragePolarity = compoundAveragePolarity / lengthofcomments
        posAveragePolarity = posAveragePolarity / lengthofcomments
        negAveragePolarity = negAveragePolarity / lengthofcomments
        neuAveragePolarity = neuAveragePolarity / lengthofcomments

        if(compoundAveragePolarity>=0.5 and compoundAveragePolarity <= 1.0):
         emoji ="Extremely happy"

        if(compoundAveragePolarity>=0.2 and compoundAveragePolarity<=0.499):
         emoji = "Happy"

        if(compoundAveragePolarity>=0 and compoundAveragePolarity <= 0.199):
         emoji = "Neutral"

        if(compoundAveragePolarity>=-0.499 and compoundAveragePolarity < 0):
         emoji = "Angry"

        if(compoundAveragePolarity >= -1.0 and compoundAveragePolarity <= -0.5):
         emoji = "Extremely angry"
         print(emoji)

    updateAverageArray = db.questions.update({"_id": ObjectId(wholedocumentid)},
                                             {"$set":
                                              {"Average":
                                               {"compoundAveragePolarity": compoundAveragePolarity, "posAveragePolarity": posAveragePolarity,
                                                   "negAveragePolarity": negAveragePolarity, "neuAveragePolarity": neuAveragePolarity}
                                               }})
    updateEmoji = db.questions.update({"_id": ObjectId(wholedocumentid)}, {
                                      "$set": {"Emoji": emoji}})
