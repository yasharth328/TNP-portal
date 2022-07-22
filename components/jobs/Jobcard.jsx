import Image from "next/image";
import NextLink from "next/link";
import jobSvg from "public/job.svg"
import rupeeSvg from "public/rupee.svg"

export { JobCard };
function JobCard({ id, details }) {
  return (
    <div className="p-3 border-2 rounded-xl border-indigo-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 ...">
      <div className="px-6 py-4">
        <NextLink href={details.website}  passHref>
          <a className="text-xl font-semibold hover:text-blue-400 hover:underline">
            <Image
              src={jobSvg}
              width={20}
              height={20}
              alt="job_image"
            ></Image> {details.role}</a>
        </NextLink>
        <p >{details.company}</p>
        <p className="text-base text-gray-700 p-2">
          <span className="underline underline-offset-2">Description</span> <br /> {details.description}
        </p>
      </div>
      <div >
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
          <Image
            src={rupeeSvg}
            alt="ruppeSvg"
            width={15}
            height={15}
          ></Image>
          {details.extras.salary}
        </span>
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
          #{details.extras.jobType}
        </span>{" "}
        <br />

        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
          Start: {details.extras.startDate}
        </span>{" "}
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
          End : {details.extras.endDate}
        </span>
      </div>

      <NextLink href={details.website} passHref>
        <a className="btn bg-green-500 hover:bg-green-700" target="_blank">Apply</a>
      </NextLink>
    </div>
  );
}
