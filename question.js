const supabaseUrl =
"https://ewikczkhfokqjordmjvz.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aWtjemtoZm9rcWpvcmRtanZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0OTY1ODgsImV4cCI6MjA5NjA3MjU4OH0.Z3TllaO0uQj0h3ZHRpx_Bm2dkZjaT6Bj3lwMRo4MKQ8";

const db = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const submitBtn = document.querySelector(".send");
const textbox = document.querySelector(".textbox");

// disable button if textbox empty
submitBtn.disabled = true;

textbox.addEventListener("input", () => {
    submitBtn.disabled = textbox.value.trim() === "";
});

// cooldown
const lastSubmission =
    localStorage.getItem("lastSubmission");

if (lastSubmission) {

    const elapsedTime =
        Date.now() - Number(lastSubmission);

    if (elapsedTime < 120000) {

        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.disabled = false;
        }, 120000 - elapsedTime);

    }
}

submitBtn.addEventListener("click", async function() {

    const message = textbox.value;

    if (message.trim() === "") {
        alert("Please enter a message");
        return;
    }

    submitBtn.disabled = true;

    localStorage.setItem(
        "lastSubmission",
        Date.now()
    );

    setTimeout(() => {
        submitBtn.disabled = false;
    }, 120000);

    const { data, error } =
    await db
        .from("messages")
        .insert([
            {
                messages: message
            }
        ]);

    console.log(data);
    console.log(error);

    textbox.value = "";
});