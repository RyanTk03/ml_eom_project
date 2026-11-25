export default interface CreateProjectRequestBody {
  name: string;
  repoName: string;
  private: boolean;
  description?: string;
  org?: string;
}
