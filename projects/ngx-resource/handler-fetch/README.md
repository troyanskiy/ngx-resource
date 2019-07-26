# @ngx-resource/handler-fetch

It's implementation of `ResourceHandler` which uses `fetch`

## How to install and setup it
```bash
& npm i --save @ngx-resource/core @ngx-resource/handler-ngx-http @ngx-resource/handler-fetch
```

In you app module
```typescript

// AoT requires an exported function for factories
export function fetchHandlerFactory() {
    return new ResourceHandlerFetch();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    ResourceModule.forRoot({
      handler: { provide: ResourceHandler, useFactory: (fetchHandlerFactory) }
    })
  ],
  declarations: [...],
  bootstrap: [...],
  entryComponents: [...],
  providers: [...]
})
export class AppModule {
}
```

## [Docs about @ngx-resource/core](https://github.com/troyanskiy/ngx-resource/blob/master/README.md)
