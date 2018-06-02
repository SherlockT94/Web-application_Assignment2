import numpy as np
import pickle
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.decomposition import PCA
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB
from sklearn.decomposition import PCA

folder_path = 'F:/COMP5318/assignment2/cifar-10-python/cifar-10-batches-py/'


def uncompress(file):
    file_path = folder_path+file
    with open(file_path, 'rb') as file:
        data = pickle.load(file, encoding='bytes')
    labels = np.array(data[b'labels'])
    raw = np.array(data[b'data'], dtype='float')
    img_data = raw.reshape([-1, 3, 32, 32]).transpose([0, 2, 3, 1])
    return img_data, labels

def getLabelName():
    file_path = folder_path+'batches.meta'
    with open(file_path, 'rb') as file:
        data = pickle.load(file, encoding='bytes')[b'label_names']
    return [name.decode() for name in data]

def loadData(bTrain=True):
    if not bTrain:
        images, labels = uncompress('test_batch')
    else:
        images = np.zeros(shape=[50000, 32, 32, 3], dtype=float)
        labels = np.zeros(shape=[50000], dtype=int)
        for i in range(5):
            batch_data, batch_labels = uncompress('data_batch_'+str(i+1))
            start = i*10000
            end = (i+1)*10000
            images[start:end, :] = batch_data
            labels[start:end] = batch_labels
    # return normalization(images), labels, np.eye(10, dtype=float)[labels]
    return images, labels, np.eye(10, dtype=float)[labels]

def normalization(images):
    images = images.reshape(-1, 3072)
    each_pixel_mean = images.mean(axis=0)
    each_pixel_std = np.std(images, axis=0)
    images = np.divide(np.subtract(images, each_pixel_mean), each_pixel_std)
    return images.reshape(-1, 32, 32, 3)



# print(images[0,:,:,:])
# print(labels)
# print(len(images))
def pcasuvclassifier(images,labels):
    n_samples = len(images)
    training_images = images.reshape((n_samples,-1))
    n_components = 100
    pca = PCA(n_components=n_components) 
    pca.fit(training_images)
    x = pca.singular_values_
    return x

#将数据分为test和training，然后reshape成二维的
def reshapedata(training_images,test_images):
    n_samples = len(training_images)
    n_samples_test = len(test_images)
    training_images = training_images.reshape((n_samples,-1))
    test_images = test_images.reshape((n_samples_test,-1))
    return training_images,test_images

#用pca压缩
def applyPCA(trainingdata,ncomponents):
    pca = PCA(ncomponents)
    x_image = pca.fit_transform(trainingdata)
    return x_image
    
def gaussianNB(training_images,training_labels,test_images,test_labels,ncomponents):
    training_images,test_images=reshapedata(training_images,test_images)
    training_images = applyPCA(training_images,ncomponents)
    test_images = applyPCA(test_images,ncomponents)
    clf = GaussianNB()
    clf.fit(training_images, training_labels)
    predict_label=clf.predict(test_images)
    accuracy = accuracy_score(test_labels,predict_label)
    return accuracy
def gaussianNBnoPCA(training_images,training_labels,test_images,test_labels):
    training_images,test_images=reshapedata(training_images,test_images)
    clf = GaussianNB()
    clf.fit(training_images, training_labels)
    predict_label=clf.predict(test_images)
    accuracy = accuracy_score(test_labels,predict_label)
    return accuracy
def multionomialNB(training_images,training_labels,test_images,test_labels,ncomponents):
    training_images,test_images=reshapedata(training_images,test_images)
    training_images = applyPCA(training_images,ncomponents)
    themin = training_images.min()
    training_images = training_images-themin
    test_images = applyPCA(test_images,ncomponents)
    themin = test_images.min()
    test_images = test_images-themin   
    clf = MultinomialNB()
    clf.fit(training_images, training_labels)
    predict_label=clf.predict(test_images)
    accuracy = accuracy_score(test_labels,predict_label)
    return accuracy


training_images,training_labels,nouse = loadData(bTrain=True)
test_images,test_labels,nouse = loadData(bTrain=False)
# accuracy_guassian = gaussianNB(training_images,training_labels,test_images,test_labels)
# accuracy_multinomial = multionomialNB(images,labels)
# print(accuracy_guassian)
# print(accuracy_multinomial)
# for i in range(5,50,5):
#     accuracy_multinomial = multionomialNB(training_images,training_labels,test_images,test_labels,i)
#     print(i, accuracy_multinomial)
accuracy_multinomialnoPCA = gaussianNBnoPCA(training_images,training_labels,test_images,test_labels)
print(accuracy_multinomialnoPCA)