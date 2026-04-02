export interface Complaint {
  id: string;
  user_id?: string;
  establishment_id?: string;
  title?: string;
  complaint_text?: string;
  response?: string;
  validated?: boolean;
}

export interface ComplaintValidation {
  complaint_id: string;
  validation: boolean;
  establishment_id: string;
  complaint_response: string;
}