import { httpService } from "@/services/http.service";

export const traineeService = {
  getMyTrainees,
  addTrainee,
  updateTrainee,
  deleteTrainee,
};

async function getMyTrainees() {
  return httpService.get("/api/trainees/my-trainees", true);
}

async function addTrainee(name: string, email: string, password: string) {
  return httpService.post("/api/trainees/add", { name, email, password }, true);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateTrainee(traineeId: string, data: any) {
  return httpService.put(`/api/trainees/${traineeId}`, data, true);
}

async function deleteTrainee(traineeId: string) {
  return httpService.del(`/api/trainees/${traineeId}`, true);
}
