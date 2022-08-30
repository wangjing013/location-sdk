# location-sdk

## 1. 使用步骤

###  设置 appKey 

```js
import { baiduLocation } from '@msbfe/location-sdk'
baiduLocation.setAppKey(appKey);
```

``appKey`` 去百度申请的应用的 key

### 2. 通过 getLocation 获取地址位置信息

```js
baiduLocation.getLocation().then((res)=> {
    console.log(res);
})
```

返回的格式为:

```json
{
    "address_detail": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "",
        "street_number": "",
        "adcode": "430100",
        "street": "",
        "city_code": 158
    },
    "point": {
        "y": "3258221.65",
        "x": "12573169.37"
    },
    "address": "湖南省长沙市"
}
```

通常获取地理位置信息日次数限制，为了减少一些不必要的浪费，提供一个 cache 的 API

### 3. 通过 proxyGetLocation 获取地址位置信息

```js
baiduLocation.proxyGetLocation({ force: false}).then((res)=> {
    console.log(res);
})
```
会把获取的结果进行缓存，后面会优先从缓存中进行读取。 

上面 ``force`` 表示需不需要每次强制获取最新的位置信息，默认值为 ``false``。 如果希望每次获取最新的，可以直接把 ``force`` 更改为 ``true`` 即可。
