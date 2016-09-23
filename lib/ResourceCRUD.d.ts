import { Resource } from './Resource';
import { ResourceMethod } from './Interfaces';
export declare class ResourceCRUD<TQuery, TShort, TFull> extends Resource {
    query: ResourceMethod<TQuery, TShort>;
    get: ResourceMethod<{
        id: any;
    }, TFull>;
    save: ResourceMethod<TFull, TFull>;
    update: ResourceMethod<TFull, TFull>;
    remove: ResourceMethod<{
        id: any;
    }, any>;
    create(data: TFull, callback?: (res: TFull) => any): TFull;
}
