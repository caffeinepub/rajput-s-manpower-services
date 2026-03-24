import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Enquiry = {
    name : Text;
    company : Text;
    serviceRequired : Text;
    details : Text;
    timestamp : Time.Time;
  };

  module Enquiry {
    public func compareByTimestamp(a : Enquiry, b : Enquiry) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let enquiries = List.empty<Enquiry>();

  public type EnquiryInput = {
    name : Text;
    company : Text;
    serviceRequired : Text;
    details : Text;
  };

  public shared ({ caller }) func submitEnquiry(input : EnquiryInput) : async () {
    if (input.name.size() == 0) {
      Runtime.trap("Name is required");
    };
    if (input.company.size() == 0) {
      Runtime.trap("Company name is required");
    };
    if (input.serviceRequired.size() == 0) {
      Runtime.trap("Service required field is mandatory");
    };

    let enquiry : Enquiry = {
      input with
      timestamp = Time.now();
    };

    enquiries.add(enquiry);
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.toArray().sort(Enquiry.compareByTimestamp);
  };
};
