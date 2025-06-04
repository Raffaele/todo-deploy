let counter = 0;

export const GET = () => {
  return new Response(JSON.stringify({
    message: "Hello, world!",
    counter: counter++,
    local: process.env.LOCAL_VARIABLE ? +process.env.LOCAL_VARIABLE : 0
  }), {
    headers: { "Content-Type": "application/json" },
  });
};