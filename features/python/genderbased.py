from pymongo import MongoClient
client = MongoClient()
#client = MongoClient("mongodb://touqeer:touqeer007@ds021663.mlab.com:21663/doyouthink")
client = MongoClient("localhost:27017")
from bson.objectid import ObjectId

#run this file after average polarity values updating

db = client.studentsento
question = db.questions.find()

for doc in question:
    genderBasedPolarity = {'malePSentiment':0,'maleNSentiment':0,'femaleNSentiment':0,'femalePSentiment':0,'neutral':0}
    docid = doc['_id']
    print(docid)
    size = len(doc['comments'])
    for comment in doc['comments']:
        if (comment['user']['gender'] == "male"):
            compoundvalue = comment['compound']
            if(compoundvalue > 0):
                genderBasedPolarity['malePSentiment'] = genderBasedPolarity['malePSentiment'] + 1
            if(compoundvalue<0):
                genderBasedPolarity['maleNSentiment'] = genderBasedPolarity['maleNSentiment'] + 1
        if (comment['user']['gender'] == "female"):
            compoundvalue = comment['compound']
            if(compoundvalue > 0):
                genderBasedPolarity['femalePSentiment'] = genderBasedPolarity['femalePSentiment'] + 1
            if(compoundvalue<0):
                genderBasedPolarity['femaleNSentiment'] = genderBasedPolarity['femaleNSentiment'] + 1

    print('\n')
    genderBasedPolarity['malePSentiment'] = (genderBasedPolarity['malePSentiment'] / size ) * 100
    genderBasedPolarity['maleNSentiment'] = (genderBasedPolarity['maleNSentiment'] / size ) * 100
    genderBasedPolarity['femaleNSentiment'] = (genderBasedPolarity['femaleNSentiment'] / size ) * 100
    genderBasedPolarity['femalePSentiment'] = (genderBasedPolarity['femalePSentiment'] / size ) * 100
    genderBasedPolarity['neutral'] = 100 - (genderBasedPolarity['malePSentiment'] + genderBasedPolarity['maleNSentiment'] +genderBasedPolarity['femaleNSentiment']+genderBasedPolarity['femalePSentiment'] )
    print(genderBasedPolarity)
    db.questions.update({"_id":ObjectId(docid)},{"$set":{"genderBasedPolarity":genderBasedPolarity}})