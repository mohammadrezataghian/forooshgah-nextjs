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
  export type FilteredUser = {
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
};
// The array type
export type filteredUsersType = FilteredUser[];

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