export interface Complaint {
  id: string;                    // UUID
  user_id?: string;
  text?: string;
  establishment_id?: string;
  response?: string;
  validated?: boolean;
}

export interface ComplaintValidation {
  complaint_id: string;
  validation: boolean;
  establishment_id: string;
  complaint_response: string;
}