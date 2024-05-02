import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  console.log("Received webhook POST request."); // debug

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not defined in environment variables."); // debug
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  console.log("Extracted headers from the request:", headerPayload); // debug

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  console.log(
    `svix-id: ${svix_id}, svix-timestamp: ${svix_timestamp}, svix-signature: ${svix_signature}`
  ); // debug

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Svix headers are missing from the request."); // debug
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  console.log("Svix headers present. Proceeding with payload verification."); // debug

  // Get the body
  const payload = await req.json();
  console.log("Request payload:", payload); // debug

  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    console.log("Webhook event verified successfully:", evt); // debug
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Handling event type: ${eventType}`); // debug

  // CREATE User in mongodb
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, username } = evt.data;

    try {
      const newUser = {
        clerkID: id,
        username: username,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
      };

      console.log(
        "Creating or updating user with the following details:",
        newUser
      ); // debug

      // const userResponse = await createUser(newUser);
      const userResponse = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      console.log("User creation or update response:", userResponse); // debug

      return new Response("User created successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt.data;

      console.log(`Deleting user with ID: ${id}`); // debug

      // await deleteUser(id!);
      await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
      });

      console.log(`User with ID ${id} deleted successfully.`); // debug

      return new Response("User deleted successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  }

  // console.log("Webhook event did not match any known event types."); // debug
  return new Response("Webhook event handled.", { status: 200 });

  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  // return new Response("", { status: 200 });
}
