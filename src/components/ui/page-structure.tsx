export default function PageStructure({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
    return (
        <main className="bg-background-base w-full pt-subMenu px-content lg:px-contentLg pb-content lg:pb-contentLg flex flex-col space-y-10">
            <div className="flex flex-col items-center space-y-contentClose mb-subTitle lg:mb-subTitleLg">
                <h1 className="text-foreground-base">{title}</h1>
                <p className="text-foreground-subdued text-center">{subtitle}</p>
            </div>
            {children}
        </main>
    );
}