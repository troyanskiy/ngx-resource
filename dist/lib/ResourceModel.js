import { mapToModel } from './ResourceAction';
export function ResourceModelParams(params) {
    return function (target) {
        let providers = [];
        if (params) {
            providers = params.providers || [];
        }
        Reflect.defineMetadata('providers', providers, target);
    };
}
export class ResourceModel {
    constructor() {
        this.$primaryKey = 'id';
    }
    static create(data = {}, commit = true) {
        if (!this.resourceInstance) {
            console.error('You should first instantiate Resource by injecting.');
        }
        let result = mapToModel.bind(this.resourceInstance)(data, this);
        if (commit) {
            result = result.save();
        }
        return result;
    }
    $fillFromObject(_object) {
        for (let propName in _object) {
            this[propName] = _object[propName];
        }
        return this;
    }
    $getData() {
        let _object = {};
        for (let propName in this) {
            if (!(this[propName] instanceof Function) && !(propName.charAt(0) === '$')) {
                _object[propName] = this[propName];
            }
        }
        return _object;
    }
    $save() {
        if (this[this.$primaryKey]) {
            this.$update();
        }
        else {
            this.$create();
        }
    }
    $update() {
        this.$resource_method('update');
    }
    $remove() {
        this.$resource_method('remove');
    }
    $resource_method(method_name) {
        let _method = this.$resource[method_name];
        if (!_method) {
            console.error(`Your Resource has no implemented ${method_name} method.`);
            return;
        }
        let data = (method_name === 'remove') ? { id: this[this.$primaryKey] } : this.$getData();
        let result = _method.bind(this.$resource)(data);
        this.$resolved = result.$resolved;
        this.$observable = result.$observable;
        this.$abortRequest = result.$abortRequest;
        this.$observable.subscribe(resp => {
            this.$fillFromObject(resp.$getData());
        });
    }
    $create() {
        this.$resource_method('create');
    }
}
//# sourceMappingURL=ResourceModel.js.map