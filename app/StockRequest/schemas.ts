import * as z from "zod";

// zod schema for validation
export const cellphoneSchema = z
  .string()
  .nonempty("این آیتم نمیتواند خالی باشد.")
  .length(11, "شماره موبایل باید 11 رقمی و بصورت عددی باشد.")
  .regex(/^\d{11}$/, "شماره موبایل باید بصورت عددی باشد.");
export const schema = z.object({
  firstName: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  lastName: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  identityNumber: z
    .string()
    .regex(/^\d+$/, "شماره شناسنامه باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
  nationalCode: z
    .string()
    .length(10, "کد ملی باید 10 رقمی و بصورت عددی باشد.")
    .regex(/^\d{10}$/, "کد ملی باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
  fatherName: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  subscriptionNo: z
    .string()
    .regex(/^\d+$/, "شماره اشتراک باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
  telephone: z
    .string()
    .length(11, "شماره تلفن باید 11 رقمی و بصورت عددی باشد.")
    .regex(/^\d{11}$/, "شماره تلفن باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
  address: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
  cellphone: z
    .string()
    .length(11, "شماره موبایل باید 11 رقمی و بصورت عددی باشد.")
    .regex(/^\d{11}$/, "شماره موبایل باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
  registrationCode: z
    .string()
    .regex(/^\d+$/, "کد ثبت نام باید بصورت عددی باشد.")
    .nonempty("این آیتم نمیتواند خالی باشد."),
  fileName: z.string().nonempty("این آیتم نمیتواند خالی باشد."),
});
// end zod schema for validation