import { Resource } from "./Resource";
import { ResourceMethod } from "./Interfaces";
export declare class ResourceCRUDBase<TQuery, TKeys, TShort, TFull> extends Resource {
    query: ResourceMethod<TQuery, TShort>;
    get: ResourceMethod<TKeys, TFull>;
    save: ResourceMethod<TFull, TFull>;
    update: ResourceMethod<TFull, TFull>;
    remove: ResourceMethod<TKeys, any>;
    create(data: TFull, callback?: (res: TFull) => any): TFull;
}
