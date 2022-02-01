import { firestore, database } from "./index";
import {convertDBSnapshoptToArrayOfObject, convertToArray} from "../utils/helpers";
export const getCollection =async collection =>{
    return await firestore.collection(collection).get().then(res=>{
        return res.docs;
    }).catch(err=>{
        console.log(err);
        return [];
    })
}

export const getCollectionByField = async (
    collection,
    fieldName,
    fieldValue,
) => {
    return await firestore
        .collection(collection) 
        .where(fieldName, '==', fieldValue)
        .get()
        .then((res) => {
            return res.docs;
        })
        .catch((res) => {
            console.log(res);
            return [];
        });
};
export const updateAFieldInDocment = async (collection,whereField,whereValue,field,fieldValue) =>{
     return await firestore.collection(collection).where(whereField,'==',whereValue).get().then(async res=>{
        if(res.docs.length>0){
            let doc = res.docs[0].id;
            return await firestore.collection(collection).doc(doc).update({[field]:fieldValue}).then(r=>{
                return r;
            }).catch(err=>{
                console.log(err);
                return false;
            }).catch(err=>{
                console.log(err);
                return false;
            });

        }
    })
}

