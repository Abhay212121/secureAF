export function Post({ data, member, loggedIn }) {
  return (
    <div className=" group min-w-150 w-[40%] mx-auto my-16 p-4 flex flex-col rounded-2xl bg-[#1A2946] min-h-40">
      <h2 className="relative text-4xl w-fit font-post-heading text-[#FF8904] ">
        {data.post_title}
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#FF8904] transition-all duration-300 group-hover:w-full"></span>
      </h2>
      <p className="text-[#F2E9E4] text-xl font-post-body">
        {data.post_message}
      </p>
      <div className="flex items-center gap-4 font-body text-amber-100 text-lg">
        <p className="font-form-text text-xl !m-0 ">
          {member && loggedIn ? data.username : "Anonymous"}
        </p>
        <p className="text-md !m-0">
          {member && loggedIn ? "@ " + data.post_time : "-:- - --/--/----"}
        </p>
      </div>
    </div>
  );
}
