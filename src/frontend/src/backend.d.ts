import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EnquiryInput {
    serviceRequired: string;
    name: string;
    company: string;
    details: string;
}
export type Time = bigint;
export interface Enquiry {
    serviceRequired: string;
    name: string;
    company: string;
    timestamp: Time;
    details: string;
}
export interface backendInterface {
    getAllEnquiries(): Promise<Array<Enquiry>>;
    submitEnquiry(input: EnquiryInput): Promise<void>;
}
