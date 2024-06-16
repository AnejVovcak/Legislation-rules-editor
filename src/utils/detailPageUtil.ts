import {updateObject} from "../api/api";
import {SocSec} from "../dtos/socSec";
import {Tax} from "../dtos/tax";
import {Mig} from "../dtos/mig";
import {CollectionEnum} from "../enums/CollectionEnum";

//publish the object
export async function handleSubmit<T>(data: Mig | SocSec | Tax,
                                      setData: React.Dispatch<React.SetStateAction<T>>,
                                      id: string | undefined,
                                      collectionName: CollectionEnum): Promise<boolean> {
    const content = data.content;
    const regex = /<a href="\[info\](.*?)">(.*?)<\/a>/g;
    const subst = `<span class="tooltip">$2<span class="tooltip-content">$1</span></span>`;
    const newContent = content.replace(regex, subst);
    console.log(newContent)
    setData(prev => ({...prev, content: newContent}));
    return await updateObject(id, data, collectionName);
}

//publish the object fixed
export async function handleSubmitBatch(data: Mig | SocSec | Tax,
                                          id: string | undefined,
                                          collectionName: CollectionEnum): Promise<boolean> {
    const content = data.content;
    const regex = /<a href="\[info\](.*?)">(.*?)<\/a>/g;
    const subst = `<span class="tooltip">$2<span class="tooltip-content">$1</span></span>`;
    data.content = content.replace(regex, subst);
    return await updateObject(id, data, collectionName);
}