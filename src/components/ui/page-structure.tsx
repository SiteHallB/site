export default function PageStructure({ title, subtitle, children }: { title: string, subtitle: React.ReactNode, children: React.ReactNode }) {
    return (
        <main className="bg-background-base w-full pt-subMenu px-content lg:px-contentLg pb-content lg:pb-contentLg flex flex-col items-center space-y-10">
            <div className="w-full flex flex-col items-center space-y-contentClose mb-subTitle lg:mb-subTitleLg">
                <h1 className="text-foreground-base text-center">{title}</h1>
                <span className="text-foreground-subdued text-left">{subtitle}</span>
            </div>
            {children}
        </main>
    );
}