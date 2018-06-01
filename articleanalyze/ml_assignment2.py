
def unpickle(file):
    import pickle 
    with open(file,'rb') as fo:
        dict=pickle.load(fo, encoding='bytes')
    return dict

label=unpickle('F:/COMP5318/assignment2/cifar-10-python/cifar-10-batches-py/batches.meta')
training_batch1=unpickle('F:/COMP5318/assignment2/cifar-10-python/cifar-10-batches-py/data_batch_1')
print(label)
print(training_batch1)
print(len(training_batch1))