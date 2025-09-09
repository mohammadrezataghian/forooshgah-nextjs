export type Address = {
    Id: number;
    Address: string;
    PostalAddress: string;
    AddressCompact: string;
    Primary: string;
    Name: string;
    InsertTime: string;
    Poi: string;
    Country: string;
    Province: string;
    County: string;
    District: string;
    RuralDistrict: string;
    City: string;
    Village: string;
    Region: string;
    Neighbourhood: string;
    LastName: string;
    Plaque: string;
    PostalCode: string;
    GeomType: string;
    CoordinatesLatitude: string;
    CoordinatesLongitude: string;
    WhereaboutesPreAddress: string;
    WhereaboutesPostalCode: string;
    EshterakNo: number;
    SetDefault: boolean;
  }
  export type sahamUserType = {
    Id: number;
    ParentId: number | null;
    FirstName: string;
    LastName: string;
    FatherName: string;
    PersonNo: string;
    CartId: string;
    Dateouzviyat: string;
    ShomareShenasname: string;
    Tel: string;
    Address: string;
    Email: string;
    Married: boolean;
    Sex: boolean;
    NationalCode: string;
    WorkPlaceId: number;
    JobId: string;
    JobCaseId: string;
    SaghfeKharidGhest: number;
    MehaleSoddor: string;
    Mobile: string;
    EshterakNo: number;
    Fldvaziat_Sahamdar: string;
    NameJobCase: string;
    NameJob: string;
    NameWorkPlace: string;
    IdBank: string;
    NameBank: string;
    MandeBedhi: number;
    ShomareMelli_H: string;
    ShomareEghtesadi_H: string;
    CodeShobe_H: string;
    CodePosti: string;
    ShomareGozarname: string;
    Hoghooghi: boolean;
    isAdmin: boolean;
  };
  export type Product = {
    RowNumber: number;
    IdKala: number;
    idGroupKala: number;
    NameGroup: string;
    CodeKala: string;
    BarCodeKala: string | null;
    NameKala: string;
    DisplayNameKala: string;
    NameLatinKala: string | null;
    NameUnit: string;
    FldDescription: string | null;
    FldType: string;
    FldUnit: string;
    NameMark: string | null;
    FldIdMark: number;
    NameDegree: string;
    FldIsExpire: boolean;
    DeActive: boolean;
    NameColor: string | null;
    NameSize: string | null;
    NameGhorfer: string;
    Mojodi: number;
    PriceForoosh: number;
    IdStoreStock: string;
    NameGhorfe: string;
    DarsadMaliat: number;
    TotalCountRecord: number;
    idForooshGaha: number;
    NameForooshgah: string;
    PriceMasrafKonande: number;
    PriceKharidAvg: number;
    Takhfif: number;
    PriceForooshAfterDiscount: number;
    FldNameImageKalaList: string; // or string[] if you want
    count?:number | undefined
};
// The array type
export type ProductType = Product[];

export type whereaboutes ={
  address: string;
  postal_address: string;
  address_compact: string;
  primary: string;
  name: string;
  poi: string;
  country: string;
  province: string;
  county: string;
  district: string;
  rural_district: string;
  city: string;
  village: string;
  region: string;
  neighbourhood: string;
  last: string;
  plaque: string;
  postal_code: string;
  geom: {
    type: "Point";
    coordinates: [string, string]; 
  };
}

interface loc {
  Id: number;
  Address: string;
  PostalAddress: string;
  AddressCompact: string;
  Primary: string;
  Name: string;
  InsertTime: string; // ISO datetime string
  Poi: string;
  Country: string;
  Province: string;
  County: string;
  District: string;
  RuralDistrict: string;
  City: string;
  Village: string;
  Region: string;
  Neighbourhood: string;
  LastName: string;
  Plaque: string;
  PostalCode: string;
  GeomType: "Point"; // seems fixed
  CoordinatesLatitude: string;  // could be number, but sample is string
  CoordinatesLongitude: string; // could be number, but sample is string
  WhereaboutesPreAddress: string;
  WhereaboutesPostalCode: string;
  EshterakNo: number;
  SetDefault: boolean;
}

export type addresses = loc[];

type MenuItem = {
  Id: string;
  Name: string;
  IdParent: string | null;
  CountOfChild: string | null;
  NameImage: string | null;
  children: MenuItem[]; // recursive structure
}
export type MenuResponse = {
  Data: MenuItem[];
  ErrorList: string[];
  resCode: number;
  resMessage: string | null;
}

type ImageItem = {
  MobileOrPc: boolean;
  OutOrInLogin: boolean;
  PatientOrPerson: boolean;
  Base64Image: string | null;
  UploadImageName: string;
  ImageOrFile: boolean;
  FileName: string;
  IdDetail: number;
  Id: number;
  Description: string;
  ImageLink: string;
  ShowInBannerDetail: boolean;
};

export type Advertisement = {
  Id: number;
  Organization: string;
  Description: string;
  linkAddress: string;
  Header: string;
  StartDate: string; // ISO date string
  EndDate: string;   // ISO date string
  InsertTime: string; // ISO date string with ms
  Payvast: string | null;
  DeActive: boolean;
  imageList: ImageItem[];
  ShowInBanner: boolean;
  NameTable: string;
  OrderImage: number;
  NameOrderImage: string;
  HexColor: string | undefined;
};
export type AdvertisementResponse = {
  advertisement: Advertisement[];
  loading: boolean;
  error: string | null;
};


export type ConfigItem ={
  Id: number;
  SiteID: number;
  Type: number;
  Key: string;
  Value: string;
  OldValue: string;
  InsertTime: string;
  Desc: string;
  Title: string;
  ShowInSettings: boolean;
  TypeValue: string;
  defaultItem: any[];
  TypeSetting: string;
  Content: {
    Id: number;
    Name: string | null;
    OrderCode: number;
    IdSetting: number;
    Type: number;
    Value: string | null;
    AttributeDeskTop: string | null;
    AttributeMobile: string | null;
    InsertTime: string;
    TypeName: string | null;
    imageUrlList: string[];
  };
  imageUrlList: string[];
}

type VideoDetail = {
  Id: number;
  Code: number;
  Description: string;
  VideoName: string;
};

export type ArticleItem = {
  FldId: number;
  Title: string;
  ShortBody: string;
  LargeBody: string;
  MainImage: string;
  ImageGallury: string;
  IsCommentable: boolean;
  IsVerify: boolean;
  NewsType: string;
  FldInsertUser: string;
  FldDeleted: boolean;
  FldAttachment: string;
  FldIdUser: number;
  FldDeActive: boolean;
  FldCategory: string;
  FldSubCategory: string;
  FldKeyWords: string;
  FldVisitCount: number;
  FldEditTime: string;
  FldSource: string;
  CreateDateTime: string;
  PublishDateTime: string;
  CreateDateTimeShamsi: string;
  PublishDateTimeShamsi: string;
  VideoList: string;
  VideoDetailList?: VideoDetail[];
};

export type FactorAfterCalc ={
  Id: number;
  IdMaliPeriod: number;
  Sal: number;
  Mah: number;
  EshterakNo: number;
  No: number;
  FactorDate: string | null;
  FactorType: number;
  Mablaghekol: number;
  Discount: number;
  KharidGhesti: number;
  PishPardakhtGhest: number;
  PardakhtShode: number;
  GhabelePardakht: number;
  Rezerve: boolean;
  Maliat: number;
  Conferm: boolean;
  IdForooshgah: number;
  IdFactoreMarjoe: number;
  IdEllatMarjoe: number;
  DateFirstGhabz: string | null;
  ForooshVije: boolean;
  LockFactor: boolean;
  IdNoeErsal: number;
  HazineErsal: number;
  SaderShode: boolean;
  TahvilShode: boolean;
  IdServer: number;
  integer: number;
  HazineBasteBandi: number;
  HazineKhadamat: number;
  IdSaleFactor: number;
  NameForooshgah: string | null;
  MablagheKharidErsalRaygan: number;
  ShenasePardakht: string | null;
  ShomareCartReturn: string | null;
  ShomareShaba: string | null;
  SahebeHesab: string | null;
  SharheMarju: string | null;
  DateErsal: string;
  DateTahvil: string;
  IdUserTahvilDehande: number;
  MarjuShode: boolean;
  TaeedeTaminKonande: boolean;
  TarikheTaeedeTaminKonande: string | null;
  ErsalByTaminKonande: boolean;
  TarikheErsalTaminKonande: string | null;
  DarkhastKharidGhesti: boolean;
  TaeedeDarkhastGhesti: boolean;
  TarikheTaeedeKharidGhesti: string | null;
  TedadGhest: number;
  SarResidAvalinGhest: string | null;
  MablagheHarGhest: number;
  KalaList: Product[];
}


export type Section = {
  Id: number;
  IdKala: number;
  IdParent: number;
  Title: string;
  Description: string;
  Template: string;
  ImageName: string;
}
export type ProductDetails = {
  RowNumber: number;
  IdKala: number;
  idGroupKala: number;
  NameGroup: string;
  CodeKala: string;
  BarCodeKala: string;
  NameKala: string;
  DisplayNameKala: string;
  NameLatinKala: string;
  NameUnit: string;
  FldDescription: string;
  FldType: string;
  FldUnit: string;
  NameMark: string;
  FldIdMark: number;
  NameDegree: string;
  FldIsExpire: boolean;
  DeActive: boolean;
  NameColor: string | null;
  NameSize: string | null;
  NameGhorfer: string;
  Mojodi: number;
  PriceForoosh: number;
  IdStoreStock: string;
  NameGhorfe: string;
  DarsadMaliat: number;
  TotalCountRecord: number;
  idForooshGaha: number;
  NameForooshgah: string;
  PriceMasrafKonande: number;
  PriceKharidAvg: number;
  Takhfif: number;
  PriceForooshAfterDiscount: number;
  FldNameImageKalaList: string;
  Attributes: any[]; // could be typed more specifically if you know its shape
  Sections: Section[];
  ShortDescription: string ;
}


type MenuData ={
  Id: string;
  Name: string;
  IdParent: string | null;
  CountOfChild: string | null;
  NameImage: string | null;
  children: MenuData[];
}
export type MenuDataResponse ={
  Data: MenuData[];
  ErrorList: any[]; // or string[] if you know they are only strings
  resCode: number;
  resMessage: string | null;
}


export type StocksRecord = {
  FldRowId: number;
  FldDate: string;       
  FldTozih: string;      
  FldAction: string;     
  FldAfzayesh: number;   
  FldKahesh: number;    
  FldMandeh: number;    
};
export type StocksRecordList = StocksRecord[];


export type ProductReturn ={
  UnitKala: string | null;
  NameGhorfer: string;
  NameSize: string | null;
  NameColor: string | null;
  DeActive: boolean;
  FldIsExpire: boolean;
  Mojodi: number;
  NameDegree: string;
  FldIdMark: number;
  NameMark: string;
  FldType: number;
  FldDescription: string;
  BarCodeKala: string | null;
  NameGroup: string;
  RowNumber: number;
  idGroupKala: number;
  Id: number;
  CodeKala: string;
  IdKala: number;
  NameKala: string;
  DisplayNameKala: string;
  FactoreId: string;
  BstoreId: number;
  NameStore: string;
  Tedad: number;
  Eshantion: number;
  Discount: number;
  UnitPrice: number;
  TotalPrice: number;
  TotalDiscount: number;
  Maliat: number;
  MaliatDarsad: number;
  PriceKharidAVG: number;
  PriceMasrafKonande: number;
  HazineErsal: number;
  IdMaliPeriod: number;
  Namojod: boolean;
  NameUnit: string;
  GhabelePardakht: number;
  IdStall: number;
  IdForooshgah: number;
  FldUnit: string;
  AccessToMarju: boolean;
  FldNameImageKalaList: string;
  IdStoreStock: number;
}
export type FactorReturn = {
  Id: number;
  IdMaliPeriod: number;
  Sal: number;
  Mah: number;
  EshterakNo: number;
  No: number;
  FactorDate: string;
  FactorType: number;
  Mablaghekol: number;
  Discount: number;
  KharidGhesti: number;
  PishPardakhtGhest: number;
  PardakhtShode: number;
  GhabelePardakht: number;
  Rezerve: boolean;
  Maliat: number;
  Conferm: boolean;
  IdForooshgah: number;
  IdFactoreMarjoe: number;
  IdEllatMarjoe: number;
  DateFirstGhabz: string;
  ForooshVije: boolean;
  LockFactor: boolean;
  IdNoeErsal: number;
  HazineErsal: number;
  SaderShode: boolean;
  TahvilShode: boolean;
  IdServer: number;
  integer: number;
  HazineBasteBandi: number;
  HazineKhadamat: number;
  IdSaleFactor: number;
  NameForooshgah: string;
  MablagheKharidErsalRaygan: number;
  ShenasePardakht: string | null;
  ShomareCartReturn: string | null;
  ShomareShaba: string | null;
  SahebeHesab: string | null;
  SharheMarju: string | null;
  DateErsal: string;
  DateTahvil: string;
  IdUserTahvilDehande: number;
  MarjuShode: boolean;
  TaeedeTaminKonande: boolean;
  TarikheTaeedeTaminKonande: string;
  ErsalByTaminKonande: boolean;
  TarikheErsalTaminKonande: string;
  DarkhastKharidGhesti: boolean;
  TaeedeDarkhastGhesti: boolean;
  TarikheTaeedeKharidGhesti: string;
  TedadGhest: number;
  SarResidAvalinGhest: string;
  MablagheHarGhest: number;
  KalaList: ProductReturn[];
}
