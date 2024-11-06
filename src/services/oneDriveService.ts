import { Client } from "@microsoft/microsoft-graph-client";
import { ViralSegment } from "../types";

export class OneDriveService {
  private graphClient: Client;

  constructor(accessToken: string) {
    this.graphClient = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async createFolder(folderName: string): Promise<string> {
    try {
      const folder = await this.graphClient
        .api("/me/drive/root/children")
        .post({
          name: folderName,
          folder: {},
          "@microsoft.graph.conflictBehavior": "rename",
        });
      return folder.id;
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  }

  async saveSegmentInfo(folderId: string, videoId: string, segments: ViralSegment[]): Promise<void> {
    try {
      const content = JSON.stringify(segments, null, 2);
      await this.graphClient
        .api(`/me/drive/items/${folderId}/children`)
        .post({
          name: `${videoId}-segments.json`,
          file: {},
          "@microsoft.graph.conflictBehavior": "rename",
          content,
        });
    } catch (error) {
      console.error("Error saving segment info:", error);
      throw error;
    }
  }
}