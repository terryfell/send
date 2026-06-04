console.log("NEW VERSION LOADED");

const supabaseUrl =
"https://ewikczkhfokqjordmjvz.supabase.co";

const supabaseKey =
"YOUR_KEY_HERE";

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