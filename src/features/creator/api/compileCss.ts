import { createServerFn } from '@tanstack/react-start';

const COMPILER_URL = "https://css-compiler-server.vercel.app/compile"


export const compileCss = createServerFn({ method: 'POST' })
  .inputValidator((data: string) => data)
  .handler(async ({ data: css }) => {
    try {


      /*
        The compileCss function was moved to an external API because
        Vercel serverless runtime throws errors when importing the Tailwind CSS compiler.
        Note that this is a temporary fix and a more efficient solution should be found.
      */
      const response = await fetch(COMPILER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ css })
      });



      if (!response.ok) {
        const errorData = await response.json();
        console.error("External compilation error:", errorData);
        return { success: false, css: "" };
      }

      const result = await response.json();
      return { success: true, css: result.css };
    } catch (error: any) {
      console.error("Tailwind compilation fetch error:", error);
      return { success: false, css: "" };
    }
  });
