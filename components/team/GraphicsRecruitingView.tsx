const DRIVE_FOLDER_URL =
    "https://drive.google.com/drive/folders/1YZU2njyWnEOMkMAD3ksB1wbCAN6EtDr?usp=sharing";
const CANVA_URL = "https://www.canva.com/";

export default function GraphicsRecruitingView() {
    return (
        <div className="graphics-recruiting w-full max-w-full px-3 py-4 md:px-6 md:py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Graphics</h1>

            <div
                className="border-round-lg md:border-round-xl px-4 py-6 md:px-8 md:py-8 mb-6 text-center shadow-2"
                style={{
                    background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)",
                }}
            >
                <h2
                    className="m-0 text-white font-bold uppercase tracking-wide"
                    style={{
                        fontSize: "clamp(1.25rem, 4vw, 2rem)",
                        textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                >
                    SOCIAL MEDIA GRAPHICS
                </h2>
            </div>

            <div className="mx-auto" style={{ maxWidth: "48rem" }}>
                <h3 className="text-lg font-bold text-900 m-0 mb-3">How to Access and Customize Graphics</h3>

                <ol className="m-0 pl-4 text-800 line-height-3" style={{ listStyle: "decimal" }}>
                    <li className="mb-4 pl-2">
                        <span className="font-semibold text-900">Download Graphics:</span>
                        <p className="m-0 mt-2 text-700">
                            Use the viewable Google link provided{" "}
                            <a href={DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="text-primary">
                                HERE
                            </a>{" "}
                            to access and download the graphics:{" "}
                            <a href={DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="text-primary break-all">
                                {DRIVE_FOLDER_URL}
                            </a>
                        </p>
                    </li>
                    <li className="mb-4 pl-2">
                        <span className="font-semibold text-900">Available Versions:</span>
                        <p className="m-0 mt-2 text-700">
                            Various topics are available, including versions translated into Spanish.
                        </p>
                    </li>
                    <li className="mb-4 pl-2">
                        <span className="font-semibold text-900">Get Creative:</span>
                        <p className="m-0 mt-2 text-700">
                            Besides using the graphics we&apos;ve provided, you can create your own or easily edit these ones using an app
                            called{" "}
                            <a href={CANVA_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">
                                CANVA
                            </a>
                            .
                        </p>
                    </li>
                </ol>

                <p className="m-0 mt-6 text-800 font-medium">Enjoy customizing and enhancing your content!</p>
            </div>
        </div>
    );
}
