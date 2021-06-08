export interface FormData {
  hostname: string;
  hostgroup: string;
  hostip: string;
  port: number;
  credential: string;
  description: string;
  id?: string | undefined;
}

interface PyFormData {
  test: string;
}

function mapDataToFormData(origin: Array<PyFormData>): Array<FormData> {
  const result: Array<FormData> = [];
  return result;
}
