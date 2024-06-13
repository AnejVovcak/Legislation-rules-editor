import {createObject, updateObject, updateObjectFixed} from "../api/api";
import {SocSec} from "../dtos/socSec";
import {Tax} from "../dtos/tax";
import {Mig} from "../dtos/mig";

export async function saveObject
(id: string | undefined, data: Tax | Mig | SocSec,
 collectionName: string,
 newOnProduction: boolean): Promise<boolean> {

    try {
        if (id === "new" || newOnProduction) {
            await createObject(data, collectionName);
            return true;
        } else if (id) {
            await updateObject(id, data, collectionName);
            return true;
        } else {
            window.close();
        }
        return true;
    } catch (error) {
        return false;
    }
}

//publish the object
export async function handleSubmit<T>(data: Mig | SocSec | Tax,
                                      setData: React.Dispatch<React.SetStateAction<T>>,
                                      id: string | undefined,
                                      collectionName: string,
                                      newOnProduction: boolean): Promise<boolean> {
    const content = data.content;
    const regex = /<a href="\[info\](.*?)">(.*?)<\/a>/g;
    const subst = `<span class="tooltip">$2<span class="tooltip-content">$1</span></span>`;
    const newContent = content.replace(regex, subst);
    console.log(newContent)
    setData(prev => ({...prev, content: newContent}));
    return await saveObject(id, data, collectionName, newOnProduction);
}

//publish the object fixed
export async function handleSubmitFixed(data: Mig | SocSec | Tax,
                                          id: string | undefined,
                                          collectionName: string): Promise<boolean> {
    const content = data.content;
    const regex = /<a href="\[info\](.*?)">(.*?)<\/a>/g;
    const subst = `<span class="tooltip">$2<span class="tooltip-content">$1</span></span>`;
    data.content = content.replace(regex, subst);
    return await updateObjectFixed(id, data, collectionName);
}