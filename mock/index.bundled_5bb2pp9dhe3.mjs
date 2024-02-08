// mock/index.ts
var mock_default = [
  {
    url: "/api/login",
    method: "post",
    response: ({ body, query }) => {
      console.log("body>>>>>>>>", body);
      console.log("query>>>>>>>>", query);
      return {
        code: 200,
        message: "ok",
        data: { name: "Evan", age: 26 }
      };
    }
  }
];
export {
  mock_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCJDOlxcXFxVc2Vyc1xcXFxsbW1cXFxcRGVza3RvcFxcXFx2dWUtaDUtdGVtcGxhdGUtdnVlLWg1LXRlbXBsYXRlXFxcXG1vY2tcXFxcaW5kZXgudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcbG1tXFxcXERlc2t0b3BcXFxcdnVlLWg1LXRlbXBsYXRlLXZ1ZS1oNS10ZW1wbGF0ZVxcXFxtb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9DOi9Vc2Vycy9sbW0vRGVza3RvcC92dWUtaDUtdGVtcGxhdGUtdnVlLWg1LXRlbXBsYXRlL21vY2svaW5kZXgudHNcIjtpbXBvcnQgeyBNb2NrTWV0aG9kLCBSZWNvcmRhYmxlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jayc7XG5cbmludGVyZmFjZSByZXNwb25zZSB7XG4gIGJvZHk6IFJlY29yZGFibGU7XG4gIHF1ZXJ5OiBSZWNvcmRhYmxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICByZXNwb25zZTogKHsgYm9keSwgcXVlcnkgfTogcmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdib2R5Pj4+Pj4+Pj4nLCBib2R5KTtcbiAgICAgIGNvbnNvbGUubG9nKCdxdWVyeT4+Pj4+Pj4+JywgcXVlcnkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMjAwLFxuICAgICAgICBtZXNzYWdlOiAnb2snLFxuICAgICAgICBkYXRhOiB7IG5hbWU6ICdFdmFuJywgYWdlOiAyNiB9LFxuICAgICAgfTtcbiAgICB9LFxuICB9LFxuXSBhcyBNb2NrTWV0aG9kW107XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBT0EsSUFBTyxlQUFRO0FBQUEsRUFDYjtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsVUFBVSxDQUFDLEVBQUUsTUFBTSxNQUFNLE1BQWdCO0FBQ3ZDLGNBQVEsSUFBSSxnQkFBZ0IsSUFBSTtBQUNoQyxjQUFRLElBQUksaUJBQWlCLEtBQUs7QUFDbEMsYUFBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsTUFBTSxFQUFFLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
