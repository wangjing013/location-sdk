import logger from "./utils/logger";
interface AddressDetail {
  adcode: string;
  city: string;
  city_code: number;
  district: string;
  province: string;
  street: string;
  street_number: string;
}

interface Point {
  x: string;
  y: string;
}

interface Content {
  address: string;
  address_detail: AddressDetail;
  point: Point;
}

interface Result {
  address: string;
  content: Content;
  status: number;
}

class BaiduLocation {
  static ak = "";
  static setAppkey(key: string) {
    BaiduLocation.ak = key;
    return this;
  }
  static loadScript() {
    const id = "baiduMap";
    let script = document.getElementById(id);
    if (script) {
      script.remove();
    }
    script = document.createElement("script");
    script.id = id;
    script.setAttribute(
      "src",
      `https://api.map.baidu.com/location/ip?ak=${BaiduLocation.ak}&callback=_afterGetLocation`
    );
    document.body.appendChild(script);
  }

  static getLocation() {
    return new Promise<Result>((resolve, reject) => {
      window._afterGetLocation = function (data: Result) {
        logger.info("_afterGetLocation", data);
        if (data.status === 0) {
          resolve(data);
        } else {
          reject(data);
        }
      };
      BaiduLocation.loadScript();
    });
  }

  static cache: Content;
  static async proxyGetLocation({ force } = { force: false }) {
    if (BaiduLocation.cache && !force) {
      return BaiduLocation.cache;
    }
    const result: Result = await BaiduLocation.getLocation();
    if (result.status === 0) {
      return (BaiduLocation.cache = result.content);
    } else {
      return {
        address: "中国",
        address_detail: {
          adcode: "430100",
          city: "北京市",
          city_code: 158,
          district: "",
          province: "北京",
          street: "",
          street_number: "",
        },
        point: {
          x: "12573169.37",
          y: "3258221.65",
        },
      };
    }
  }
}

export default BaiduLocation;
