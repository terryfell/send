
textbox.addEventListener("input", () => {
    submitBtn.disabled = textbox.value.trim() === "";
});

console.log("NEW VERSION LOADED");

console.log(window.supabase);

const supabaseUrl =
"https://ewikczkhfokqjordmjvz.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aWtjemtoZm9rcWpvcmRtanZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0OTY1ODgsImV4cCI6MjA5NjA3MjU4OH0.Z3TllaO0uQj0h3ZHRpx_Bm2dkZjaT6Bj3lwMRo4MKQ8";

const db = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


console.log("DB:", db);
console.log("FROM:", db.from);


//var


var submitBtn = document.querySelector(".send");

console.log("saved:", localStorage.getItem("lastSubmission"));

const lastSubmission =
    localStorage.getItem("lastSubmission");

if (lastSubmission) {

    const elapsedTime =
        Date.now() - Number(lastSubmission);

    if (elapsedTime < 120000) {

        submitBtn.disabled = true;

        setTimeout(function() {

            submitBtn.disabled = false;

        }, 120000 - elapsedTime);

    }

}




//event


submitBtn.addEventListener("click", async function() {

        submitBtn.disabled = true;

        setTimeout(function() {

    submitBtn.disabled = false;

}, 120000);

localStorage.setItem(
    "lastSubmission",
    Date.now()
);

const message =
    document.querySelector(".textbox").value;

if (message.trim() === "") {
    alert("Please enter a message");
    return;
}
    
console.log("MESSAGE:", message);

const { data, error } =
await db
    .from("messages")
    .insert([
        {
            messages: message
        }
    ]);

    console.log(db);
    console.log(data);
    console.log(error);

});