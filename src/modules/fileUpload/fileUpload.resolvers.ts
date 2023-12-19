import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload-ts";
import { resolve } from "path";

export const fileUpload = {
  Mutation: {
    fileUpload: async (_: unknown, { file }: any) => {
      try {
        let { filename, createReadStream } = await file;
        filename = Date.now() + filename.replace(/\s/g, "");
        const stream = createReadStream();
        const out = createWriteStream(resolve("uploads", filename));
        stream.pipe(out);

        
        return "file uploaded";
      } catch (error: any) {
        console.log(error.message);
      }
    },
  },
  Upload: GraphQLUpload,
};
