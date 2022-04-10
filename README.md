This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After, cloning this repository we need to setup firebase console.

- You can follow this [guide](https://codinglatte.com/posts/how-to/how-to-create-a-firebase-project/) on how to setup your firebase project.
- After setting up your firebase project, generate admin sdk keys to be used on the API end of this application. You can follow this [guide](https://medium.com/litslink/firebase-admin-sdk-basics-in-examples-ee7e009a1116) on how to generate and export sdk keys.
- Create a `.env.local` file in the root of the solution and add the details of the exported keys ().

```
  type = <value>
  project_id = <value>
  private_key_id = <value>
  private_key = {"privateKey": <value>}
  client_email = <value>
  client_id = <value>
  auth_uri = <value>
  token_uri = <value>
  auth_provider_x509_cert_url = <value>
  client_x509_cert_url = <value>
```

- Next would be to create a Web App on your firebase project, To do this go to `Project Settings` and on the bottom part of the page click `Add App` and select `Web`.
- Follow thru the guide then in the end you would be provided app keys to be added to our `.env.local` as well.

```
  NEXT_PUBLIC_API_KEY = <value>
  NEXT_PUBLIC_AUTH_DOMAIN = <value>
  NEXT_PUBLIC_PROJECT_ID = <value>
  NEXT_PUBLIC_STORAGE_BUCKET = <value>
  NEXT_PUBLIC_MESSAGING_SENDER_ID = <value>
  NEXT_PUBLIC_APP_ID = <value>

```

- Lastly add a reference user_count document id on `.env.local`.

```
  count_document_id = uftFc0QPeHTpiwoceUEt
```

-Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

