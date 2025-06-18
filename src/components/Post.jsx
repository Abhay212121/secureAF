export function Post({ data, member, loggedIn }) {
  return (
    <div className="min-w-150 w-[40%] border-2 mx-auto my-16 p-4 flex flex-col gap-4 rounded-2xl">
      <h2 className="text-2xl font-form-head ">{data.post_title}</h2>
      <p className="text-blue-500 text-xl font-form-text">
        {data.post_message}
      </p>
      <div className="flex gap-4 font-form-head text-lg">
        <p className="italic">
          {console.log(member)}
          {console.log(loggedIn)}
          {member && loggedIn ? data.username : "Anonymous"}
        </p>
        <p>@{data.post_time}</p>
      </div>
    </div>
  );
}
