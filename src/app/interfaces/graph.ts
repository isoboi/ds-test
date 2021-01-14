export interface Graph {
  assessmentId: number;
  data?: {
    Agreeableness?: string;
    Drive?: string;
    Luck?: string;
    Openess?: string;
  };
  type?: string;
}
