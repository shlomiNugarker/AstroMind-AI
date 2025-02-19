import { httpService } from "@/services/http.service";

export const coachService = {
  getCoaches,
  addCoach,
  updateCoach,
  deleteCoach,
};

async function getCoaches() {
  return httpService.get("/api/coaches/all", true);
}

async function addCoach(name: string, email: string, password: string) {
  return httpService.post("/api/coaches/add", { name, email, password }, true);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateCoach(coachId: string, data: any) {
  return httpService.put(`/api/coaches/${coachId}`, data, true);
}

async function deleteCoach(coachId: string) {
  return httpService.del(`/api/coaches/${coachId}`, true);
}
