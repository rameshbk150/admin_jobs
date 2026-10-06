"use client";

export default function SettingsPage() {
  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Frontend only: Settings saved."
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">
          Configuration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage basic admin panel settings.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900">
          Portal Information
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Input
            label="Website Name"
            defaultValue="JobFinder"
          />

          <Input
            label="Admin Name"
            defaultValue="Admin"
          />

          <Input
            label="Admin Email"
            defaultValue="admin@jobfinder.com"
          />

          <Input
            label="Support Email"
            defaultValue="support@jobfinder.com"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  defaultValue,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        defaultValue={defaultValue}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
      />
    </label>
  );
}