// 50 Influential Historical Writings
const HISTORICAL_WRITINGS = [
    // Ancient Greek Temple writings (1-17)
    {
        id: 1,
        title: "The Republic",
        author: "Plato",
        year: "380 BCE",
        location: "temple",
        summary: "A foundational work exploring justice, governance, and the ideal state.",
        description: "Plato's Republic is one of the most influential works in Western philosophy and political theory. Written as a Socratic dialogue, it examines the nature of justice, the characteristics of a just city-state and just man, and introduces the famous Allegory of the Cave. The work has profoundly influenced political philosophy, ethics, and education for over two millennia.",
        keyConcepts: ["Justice and morality", "The Theory of Forms", "Philosopher-kings", "The Allegory of the Cave", "The tripartite soul"],
        significance: "Foundational text for Western philosophy, political theory, and ethical thought. Its ideas continue to influence discussions on governance, education, and human nature."
    },
    {
        id: 2,
        title: "The Iliad",
        author: "Homer",
        year: "8th Century BCE",
        location: "temple",
        summary: "Epic poem about the Trojan War, exploring honor, mortality, and heroism.",
        description: "The Iliad is an ancient Greek epic poem attributed to Homer. Set during the Trojan War, it focuses on the Greek hero Achilles and explores themes of honor, wrath, fate, and mortality. The epic has been central to the Western literary canon and has influenced countless works of literature, art, and culture.",
        keyConcepts: ["Heroism and honor", "Fate and free will", "The wrath of Achilles", "Divine intervention", "Mortality and glory"],
        significance: "One of the oldest works of Western literature, establishing many narrative conventions and exploring timeless human themes that resonate across cultures and eras."
    },
    {
        id: 3,
        title: "Nicomachean Ethics",
        author: "Aristotle",
        year: "350 BCE",
        location: "temple",
        summary: "Philosophical treatise on ethics, virtue, and the good life.",
        description: "Aristotle's Nicomachean Ethics is a foundational text in virtue ethics. It explores what constitutes the good life (eudaimonia) and argues that virtue is a mean between extremes. The work examines moral and intellectual virtues, friendship, pleasure, and practical wisdom, providing a comprehensive ethical framework.",
        keyConcepts: ["Eudaimonia (human flourishing)", "Virtue as a mean", "Practical wisdom (phronesis)", "Moral and intellectual virtues", "The role of friendship"],
        significance: "Central to ethical philosophy, influencing both ancient and modern moral theory. Its emphasis on character and virtue continues to shape contemporary ethics."
    },
    {
        id: 4,
        title: "The Histories",
        author: "Herodotus",
        year: "440 BCE",
        location: "temple",
        summary: "First major work of historical writing, chronicling the Greco-Persian Wars.",
        description: "Herodotus' Histories is considered the first work of history in Western literature. It records the ancient traditions, politics, geography, and conflicts of diverse cultures, with particular focus on the Greco-Persian Wars. Herodotus is often called the 'Father of History' for his systematic investigation of past events.",
        keyConcepts: ["Historical inquiry", "Cultural anthropology", "Cause and effect in history", "Oral traditions", "East-West cultural exchange"],
        significance: "Established history as a discipline, pioneering the systematic collection and critical examination of past events and their causes."
    },
    {
        id: 5,
        title: "Meditations",
        author: "Marcus Aurelius",
        year: "170-180 CE",
        location: "temple",
        summary: "Stoic philosophical reflections by a Roman Emperor on virtue and self-improvement.",
        description: "Written by Roman Emperor Marcus Aurelius as personal notes to himself, Meditations is a cornerstone of Stoic philosophy. It offers practical wisdom on how to live virtuously, manage emotions, accept fate, and fulfill one's duties. The work emphasizes self-discipline, rational thinking, and living in harmony with nature.",
        keyConcepts: ["Stoic philosophy", "Self-discipline", "Acceptance of fate", "Rational living", "Duty and virtue"],
        significance: "One of the most accessible and influential works of Stoic philosophy, continuing to inspire readers seeking wisdom on resilience and ethical living."
    },
    {
        id: 6,
        title: "The Odyssey",
        author: "Homer",
        year: "8th Century BCE",
        location: "temple",
        summary: "Epic poem following Odysseus's journey home after the Trojan War.",
        description: "Homer's Odyssey is an epic poem that follows the Greek hero Odysseus on his ten-year journey home after the Trojan War. It explores themes of perseverance, cunning, hospitality, loyalty, and the relationship between mortals and gods. The work has profoundly influenced Western literature and storytelling.",
        keyConcepts: ["The hero's journey", "Cunning and intelligence", "Hospitality (xenia)", "Loyalty and family", "Divine fate"],
        significance: "Archetypal narrative of the journey and return, influencing countless literary works and establishing narrative patterns still used today."
    },
    {
        id: 7,
        title: "Poetics",
        author: "Aristotle",
        year: "335 BCE",
        location: "temple",
        summary: "Foundational text on literary theory, drama, and tragedy.",
        description: "Aristotle's Poetics is the earliest surviving work of literary theory and criticism. It analyzes the elements of tragedy, including plot, character, diction, and spectacle. The work introduced concepts like catharsis, mimesis, and the three unities, which have profoundly influenced dramatic theory and literary criticism.",
        keyConcepts: ["Tragedy and catharsis", "Mimesis (imitation)", "Plot structure", "Character development", "The three unities"],
        significance: "Foundational text for literary criticism and dramatic theory, shaping Western understanding of narrative, drama, and the arts for millennia."
    },
    {
        id: 8,
        title: "Oedipus Rex",
        author: "Sophocles",
        year: "429 BCE",
        location: "temple",
        summary: "Tragic play exploring fate, free will, and self-discovery.",
        description: "Sophocles' Oedipus Rex is one of the greatest tragedies of ancient Greece. It tells the story of King Oedipus, who unknowingly fulfills a prophecy that he would kill his father and marry his mother. The play explores themes of fate, free will, truth, and the limits of human knowledge.",
        keyConcepts: ["Fate vs. free will", "Tragic irony", "Self-knowledge", "Hubris", "The search for truth"],
        significance: "Exemplary Greek tragedy that has influenced drama, psychology (the Oedipus complex), and literature for over two millennia."
    },
    {
        id: 9,
        title: "The Art of War",
        author: "Sun Tzu",
        year: "5th Century BCE",
        location: "temple",
        summary: "Ancient Chinese military treatise on strategy and tactics.",
        description: "Sun Tzu's Art of War is an ancient Chinese military treatise that has influenced military thinking, business strategy, and leadership worldwide. It emphasizes strategic thinking, knowing oneself and one's enemy, and winning without fighting. Its principles transcend military applications and apply to various competitive situations.",
        keyConcepts: ["Strategic planning", "Deception and flexibility", "Knowing yourself and your enemy", "Terrain and timing", "Winning without fighting"],
        significance: "One of the most influential works on strategy and tactics, applied across military, business, sports, and personal development contexts globally."
    },
    {
        id: 10,
        title: "Analects",
        author: "Confucius",
        year: "5th-3rd Century BCE",
        location: "temple",
        summary: "Collection of Confucian teachings on ethics, morality, and governance.",
        description: "The Analects is a collection of sayings and ideas attributed to the Chinese philosopher Confucius and his disciples. It covers topics including ethics, morality, proper conduct, governance, and education. The text has profoundly influenced East Asian culture, philosophy, and political thought.",
        keyConcepts: ["Ren (benevolence)", "Li (ritual propriety)", "Filial piety", "Junzi (exemplary person)", "Ethical governance"],
        significance: "Foundational text of Confucianism, shaping East Asian civilization, ethics, education, and governance for over two millennia."
    },
    {
        id: 11,
        title: "The Symposium",
        author: "Plato",
        year: "385-370 BCE",
        location: "temple",
        summary: "Philosophical dialogue exploring the nature of love.",
        description: "Plato's Symposium presents a series of speeches on the nature of love (eros) delivered at a banquet in ancient Athens. The dialogue explores love from various perspectives and culminates in Socrates' account of love as desire for beauty and wisdom. It introduces the concept of 'Platonic love' and has influenced Western thought on love and desire.",
        keyConcepts: ["The nature of eros", "Platonic love", "The ladder of love", "Beauty and wisdom", "The myth of the androgyne"],
        significance: "Influential philosophical exploration of love that has shaped Western understanding of romantic love, beauty, and the relationship between physical and spiritual desire."
    },
    {
        id: 12,
        title: "Antigone",
        author: "Sophocles",
        year: "441 BCE",
        location: "temple",
        summary: "Tragic play about moral law versus state law.",
        description: "Sophocles' Antigone is a tragedy that explores the conflict between divine law and human law. Antigone defies King Creon's decree and buries her brother, leading to tragic consequences. The play examines themes of civil disobedience, family loyalty, justice, and the role of women in society.",
        keyConcepts: ["Divine law vs. human law", "Civil disobedience", "Family loyalty", "Justice and morality", "Gender and power"],
        significance: "Enduring exploration of the conflict between individual conscience and state authority, influencing political philosophy and discussions of civil disobedience."
    },
    {
        id: 13,
        title: "The Apology",
        author: "Plato",
        year: "399 BCE",
        location: "temple",
        summary: "Socrates' defense speech at his trial for impiety and corrupting youth.",
        description: "Plato's Apology recounts Socrates' defense at his trial in Athens. Socrates argues that he serves the gods by questioning fellow citizens and exposing their ignorance. Rather than begging for mercy, he maintains his philosophical mission. The work is a powerful defense of philosophy and the examined life.",
        keyConcepts: ["The examined life", "Philosophical inquiry", "Moral integrity", "Wisdom and ignorance", "Civil disobedience"],
        significance: "Foundational text on the value of philosophy, critical thinking, and moral integrity in the face of unjust authority."
    },
    {
        id: 14,
        title: "Metamorphoses",
        author: "Ovid",
        year: "8 CE",
        location: "temple",
        summary: "Latin narrative poem chronicling mythological transformations.",
        description: "Ovid's Metamorphoses is a comprehensive collection of Greek and Roman myths, organized around the theme of transformation. It includes famous stories like Daphne and Apollo, Narcissus, and the fall of Icarus. The work has profoundly influenced Western art, literature, and culture.",
        keyConcepts: ["Transformation and change", "Greek and Roman mythology", "Love and desire", "Divine punishment", "Human nature"],
        significance: "Major source for classical mythology, influencing countless works of art, literature, and culture throughout Western history."
    },
    {
        id: 15,
        title: "Politics",
        author: "Aristotle",
        year: "350 BCE",
        location: "temple",
        summary: "Philosophical treatise on political theory and governance.",
        description: "Aristotle's Politics examines various forms of government, citizenship, and the best state. It argues that humans are political animals and explores different constitutions, including monarchy, aristocracy, and democracy. The work has influenced political philosophy and theory for centuries.",
        keyConcepts: ["The political animal", "Forms of government", "Citizenship", "The best state", "Natural slavery debate"],
        significance: "Foundational work in political science, influencing Western political thought, constitutional design, and debates on governance."
    },
    {
        id: 16,
        title: "The Aeneid",
        author: "Virgil",
        year: "29-19 BCE",
        location: "temple",
        summary: "Epic poem following Aeneas's journey to found Rome.",
        description: "Virgil's Aeneid is a Latin epic poem that tells the story of Aeneas, a Trojan who travels to Italy to become the ancestor of the Romans. Commissioned by Emperor Augustus, it legitimizes Roman rule and explores themes of duty, fate, and the costs of empire. It has profoundly influenced Western literature.",
        keyConcepts: ["Duty and pietas", "Fate and destiny", "The founding of Rome", "Empire and civilization", "Personal sacrifice"],
        significance: "National epic of ancient Rome, influencing Western epic poetry and establishing literary models for centuries."
    },
    {
        id: 17,
        title: "Tao Te Ching",
        author: "Laozi",
        year: "6th-4th Century BCE",
        location: "temple",
        summary: "Fundamental text of Taoism on the Tao and natural harmony.",
        description: "The Tao Te Ching is a fundamental text of Taoism, traditionally attributed to the sage Laozi. It explores the Tao (the Way), wu wei (effortless action), and living in harmony with nature. The text's paradoxical and poetic style has influenced Chinese philosophy, religion, politics, and culture.",
        keyConcepts: ["The Tao (the Way)", "Wu wei (effortless action)", "Yin and yang", "Natural simplicity", "Harmony with nature"],
        significance: "Foundational Taoist text influencing Chinese and global philosophy, spirituality, and approaches to living in harmony with the natural world."
    },

    // Masquerade Ballroom writings (18-34)
    {
        id: 18,
        title: "The Prince",
        author: "Niccolò Machiavelli",
        year: "1532",
        location: "ballroom",
        summary: "Political treatise on power, statecraft, and pragmatic leadership.",
        description: "Machiavelli's The Prince is a political treatise that offers advice to rulers on how to gain and maintain power. It advocates pragmatic, sometimes ruthless methods, arguing that the ends justify the means. The work introduced the concept of realpolitik and has influenced political theory, leadership, and strategy.",
        keyConcepts: ["Political realism", "The ends justify the means", "Virtù and fortuna", "Fear vs. love", "Pragmatic leadership"],
        significance: "Revolutionary work in political science, introducing realist political theory and influencing discussions on power, ethics, and leadership."
    },
    {
        id: 19,
        title: "Hamlet",
        author: "William Shakespeare",
        year: "1603",
        location: "ballroom",
        summary: "Tragic play exploring revenge, madness, and existential questions.",
        description: "Shakespeare's Hamlet is one of the most famous plays in literature. It follows Prince Hamlet as he seeks revenge for his father's murder while grappling with questions of existence, morality, and madness. The play's complex characters and philosophical depth have made it enduringly influential.",
        keyConcepts: ["Revenge and justice", "Madness real and feigned", "Existential questions", "Mortality", "Appearance vs. reality"],
        significance: "One of the greatest works of literature, exploring universal human questions and influencing drama, psychology, and philosophy."
    },
    {
        id: 20,
        title: "Divine Comedy",
        author: "Dante Alighieri",
        year: "1320",
        location: "ballroom",
        summary: "Epic poem narrating a journey through Hell, Purgatory, and Paradise.",
        description: "Dante's Divine Comedy is an epic poem that narrates the poet's journey through the afterlife, guided by Virgil and Beatrice. It explores themes of sin, redemption, divine justice, and the nature of God. The work has profoundly influenced Western literature, theology, and art.",
        keyConcepts: ["Sin and redemption", "Divine justice", "The structure of the afterlife", "Allegory and symbolism", "The journey to God"],
        significance: "Masterpiece of world literature that shaped Christian theology, Italian language, and Western literary tradition with its vivid imaginative vision."
    },
    {
        id: 21,
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        year: "1605-1615",
        location: "ballroom",
        summary: "Novel following a delusional knight's adventures, exploring reality and idealism.",
        description: "Cervantes' Don Quixote tells the story of a man who reads so many chivalric romances that he becomes delusional and sets out as a knight-errant. The novel explores themes of reality vs. illusion, idealism, and the power of literature. It is often considered the first modern novel.",
        keyConcepts: ["Reality vs. illusion", "Idealism and pragmatism", "The power of literature", "Parody and satire", "Sanity and madness"],
        significance: "Often called the first modern novel, it revolutionized narrative fiction and influenced the development of the novel as a literary form."
    },
    {
        id: 22,
        title: "Discourse on Method",
        author: "René Descartes",
        year: "1637",
        location: "ballroom",
        summary: "Philosophical work introducing methodological doubt and 'I think, therefore I am.'",
        description: "Descartes' Discourse on Method outlines his philosophical method of systematic doubt to establish certain knowledge. It introduces the famous phrase 'I think, therefore I am' (cogito, ergo sum) and argues for mind-body dualism. The work is foundational to modern philosophy and rationalism.",
        keyConcepts: ["Methodological doubt", "Cogito ergo sum", "Rationalism", "Mind-body dualism", "Scientific method"],
        significance: "Foundational text of modern philosophy, establishing rationalism and influencing epistemology, metaphysics, and the scientific method."
    },
    {
        id: 23,
        title: "Leviathan",
        author: "Thomas Hobbes",
        year: "1651",
        location: "ballroom",
        summary: "Political philosophy on the social contract and absolute sovereignty.",
        description: "Hobbes' Leviathan argues for a social contract and the necessity of a strong central authority to prevent the 'state of nature,' which he describes as 'solitary, poor, nasty, brutish, and short.' The work has profoundly influenced political philosophy, particularly theories of sovereignty and the state.",
        keyConcepts: ["Social contract", "State of nature", "Absolute sovereignty", "Natural rights", "The commonwealth"],
        significance: "Foundational work in political philosophy, influencing social contract theory and debates on the relationship between individuals and government."
    },
    {
        id: 24,
        title: "Two Treatises of Government",
        author: "John Locke",
        year: "1689",
        location: "ballroom",
        summary: "Political philosophy on natural rights and government by consent.",
        description: "Locke's Two Treatises of Government argues for natural rights (life, liberty, and property) and government based on consent of the governed. He challenges the divine right of kings and advocates for the right to revolution against unjust rulers. The work influenced democratic theory and the American Revolution.",
        keyConcepts: ["Natural rights", "Government by consent", "Right to revolution", "Property rights", "Separation of powers"],
        significance: "Foundational text for liberalism and democratic theory, profoundly influencing the American Revolution and modern constitutional government."
    },
    {
        id: 25,
        title: "Candide",
        author: "Voltaire",
        year: "1759",
        location: "ballroom",
        summary: "Satirical novella critiquing optimism and societal institutions.",
        description: "Voltaire's Candide is a satirical novella that follows the misadventures of Candide, a naive young man who believes in philosophical optimism despite experiencing numerous disasters. The work critiques optimistic philosophy, religious institutions, and social injustices of the time.",
        keyConcepts: ["Satire of optimism", "Religious hypocrisy", "Social critique", "Human suffering", "Cultivating one's garden"],
        significance: "Influential Enlightenment satire that challenged religious and philosophical orthodoxy, promoting reason, tolerance, and skepticism."
    },
    {
        id: 26,
        title: "The Social Contract",
        author: "Jean-Jacques Rousseau",
        year: "1762",
        location: "ballroom",
        summary: "Political philosophy on popular sovereignty and collective will.",
        description: "Rousseau's Social Contract argues that legitimate political authority comes from a social contract agreed upon by all citizens for their mutual benefit. It introduces the concept of the 'general will' and argues that people must collectively govern themselves. The work influenced democratic theory and the French Revolution.",
        keyConcepts: ["The general will", "Popular sovereignty", "Social contract", "Freedom and equality", "Legitimate authority"],
        significance: "Highly influential political work that shaped democratic theory, inspired the French Revolution, and continues to influence political philosophy."
    },
    {
        id: 27,
        title: "The Wealth of Nations",
        author: "Adam Smith",
        year: "1776",
        location: "ballroom",
        summary: "Foundational text of modern economics on free markets and capitalism.",
        description: "Adam Smith's Wealth of Nations is a foundational text of modern economics. It argues for free markets, division of labor, and the 'invisible hand' of self-interest guiding economic prosperity. The work laid the foundation for classical economics and influenced capitalist economic theory.",
        keyConcepts: ["Division of labor", "The invisible hand", "Free markets", "Self-interest", "Economic growth"],
        significance: "Foundational work in economics, establishing classical economic theory and influencing capitalist economic systems worldwide."
    },
    {
        id: 28,
        title: "Rights of Man",
        author: "Thomas Paine",
        year: "1791",
        location: "ballroom",
        summary: "Defense of the French Revolution and human rights.",
        description: "Paine's Rights of Man defends the French Revolution against critics and argues for human rights, representative government, and social welfare. It challenges hereditary monarchy and aristocracy, advocating for democratic republicanism. The work influenced democratic movements and human rights discourse.",
        keyConcepts: ["Natural rights", "Republican government", "Social welfare", "Democratic revolution", "Equality"],
        significance: "Influential revolutionary text that advanced democratic ideals, human rights, and social reform during the Age of Revolution."
    },
    {
        id: 29,
        title: "A Vindication of the Rights of Woman",
        author: "Mary Wollstonecraft",
        year: "1792",
        location: "ballroom",
        summary: "Early feminist treatise advocating for women's education and equality.",
        description: "Wollstonecraft's Vindication argues that women are not naturally inferior to men but appear so due to lack of education. She advocates for women's education and their treatment as rational beings with equal rights. The work is foundational to feminist philosophy and women's rights movements.",
        keyConcepts: ["Women's education", "Gender equality", "Rational beings", "Social conditioning", "Women's rights"],
        significance: "Pioneering feminist text that challenged gender inequality and laid the foundation for women's rights movements and feminist philosophy."
    },
    {
        id: 30,
        title: "Critique of Pure Reason",
        author: "Immanuel Kant",
        year: "1781",
        location: "ballroom",
        summary: "Philosophical work on the limits and structure of human knowledge.",
        description: "Kant's Critique of Pure Reason examines the limits and structure of human knowledge. It argues that our knowledge is shaped by innate mental categories and that we cannot know things-in-themselves. The work synthesizes rationalism and empiricism and revolutionized philosophy.",
        keyConcepts: ["Transcendental idealism", "Synthetic a priori knowledge", "The limits of reason", "Phenomena and noumena", "Copernican Revolution in philosophy"],
        significance: "Revolutionary philosophical work that transformed epistemology, metaphysics, and influenced all subsequent Western philosophy."
    },
    {
        id: 31,
        title: "Phenomenology of Spirit",
        author: "G.W.F. Hegel",
        year: "1807",
        location: "ballroom",
        summary: "Philosophical work on consciousness, history, and dialectical development.",
        description: "Hegel's Phenomenology of Spirit traces the development of consciousness from basic sense-certainty to absolute knowledge. It introduces the dialectical method and the master-slave dialectic. The work profoundly influenced philosophy, particularly Marxism, existentialism, and critical theory.",
        keyConcepts: ["Dialectical development", "Master-slave dialectic", "Absolute Spirit", "Historical consciousness", "Self-consciousness"],
        significance: "Profoundly influential philosophical work that shaped German idealism, Marxism, and subsequent Continental philosophy."
    },
    {
        id: 32,
        title: "On Liberty",
        author: "John Stuart Mill",
        year: "1859",
        location: "ballroom",
        summary: "Political philosophy on individual freedom and the harm principle.",
        description: "Mill's On Liberty argues for the importance of individual liberty and limits on state power. It introduces the harm principle: the only justification for limiting someone's freedom is to prevent harm to others. The work has profoundly influenced liberal political philosophy and defenses of civil liberties.",
        keyConcepts: ["The harm principle", "Individual liberty", "Freedom of expression", "Tyranny of the majority", "Utilitarianism and rights"],
        significance: "Foundational liberal text defending individual freedom, free speech, and civil liberties against government and social coercion."
    },
    {
        id: 33,
        title: "The Communist Manifesto",
        author: "Karl Marx and Friedrich Engels",
        year: "1848",
        location: "ballroom",
        summary: "Revolutionary text on class struggle and communist theory.",
        description: "The Communist Manifesto outlines Marx and Engels's theory of history as class struggle and calls for proletarian revolution. It critiques capitalism and advocates for a communist society without private property or class distinctions. The work has profoundly influenced political movements, revolutions, and socialist thought.",
        keyConcepts: ["Class struggle", "Historical materialism", "Proletarian revolution", "Abolition of private property", "Workers of the world, unite"],
        significance: "One of the most influential political documents in history, shaping communist movements, socialist thought, and global politics."
    },
    {
        id: 34,
        title: "Beyond Good and Evil",
        author: "Friedrich Nietzsche",
        year: "1886",
        location: "ballroom",
        summary: "Philosophical critique of traditional morality and truth.",
        description: "Nietzsche's Beyond Good and Evil challenges traditional moral values, arguing they are based on outdated metaphysics. It critiques Christianity, democracy, and scientific objectivity, while advocating for a revaluation of values and the creation of new, life-affirming moralities. The work influenced existentialism and postmodernism.",
        keyConcepts: ["Will to power", "Master and slave morality", "Perspectivism", "Critique of Christianity", "The overman"],
        significance: "Influential philosophical critique that challenged Western moral and philosophical traditions, influencing existentialism, postmodernism, and contemporary philosophy."
    },

    // Old Church writings (35-50)
    {
        id: 35,
        title: "The Bible",
        author: "Various Authors",
        year: "Multiple centuries BCE-CE",
        location: "church",
        summary: "Sacred scripture of Christianity, foundational to Western civilization.",
        description: "The Bible is the sacred scripture of Christianity, consisting of the Old and New Testaments. It contains religious texts, historical narratives, poetry, prophecy, and teachings that have shaped Western civilization, ethics, law, literature, and art for millennia.",
        keyConcepts: ["Creation and covenant", "Law and prophecy", "Redemption", "Love and justice", "Eternal life"],
        significance: "Most influential book in Western history, shaping religious belief, moral values, law, literature, art, and culture for over two millennia."
    },
    {
        id: 36,
        title: "The Qur'an",
        author: "Revealed to Prophet Muhammad",
        year: "610-632 CE",
        location: "church",
        summary: "Sacred text of Islam, foundational to Islamic civilization.",
        description: "The Qur'an is the sacred text of Islam, believed by Muslims to be the word of God revealed to Prophet Muhammad. It provides guidance on faith, law, morality, and human conduct. The Qur'an has profoundly influenced Islamic civilization, law, culture, and spirituality.",
        keyConcepts: ["Tawhid (oneness of God)", "Prophethood", "Divine guidance", "Justice and mercy", "Submission to God"],
        significance: "Central religious text of Islam, shaping Islamic civilization, law, ethics, and spirituality, and influencing over a billion people worldwide."
    },
    {
        id: 37,
        title: "Confessions",
        author: "Saint Augustine",
        year: "397-400 CE",
        location: "church",
        summary: "Autobiographical work on conversion, sin, and divine grace.",
        description: "Augustine's Confessions is a spiritual autobiography recounting his conversion to Christianity. It explores themes of sin, grace, time, memory, and the nature of God. The work pioneered the autobiography genre and profoundly influenced Christian theology and Western thought.",
        keyConcepts: ["Sin and redemption", "Divine grace", "The nature of time", "Memory and self-knowledge", "Spiritual conversion"],
        significance: "Pioneering autobiography and influential theological work that shaped Christian doctrine, philosophy, and the development of Western introspective tradition."
    },
    {
        id: 38,
        title: "Summa Theologica",
        author: "Thomas Aquinas",
        year: "1265-1274",
        location: "church",
        summary: "Comprehensive synthesis of Christian theology and Aristotelian philosophy.",
        description: "Aquinas's Summa Theologica is a systematic theological work that synthesizes Christian doctrine with Aristotelian philosophy. It addresses questions on God, creation, morality, Christ, and the sacraments using rational argumentation. The work has profoundly influenced Catholic theology and Western philosophy.",
        keyConcepts: ["Natural theology", "Five Ways to prove God", "Natural law", "Faith and reason", "Virtue ethics"],
        significance: "Foundational work of Catholic theology and Scholastic philosophy, influencing Christian thought, ethics, and the relationship between faith and reason."
    },
    {
        id: 39,
        title: "The City of God",
        author: "Saint Augustine",
        year: "413-426 CE",
        location: "church",
        summary: "Theological work on the relationship between Church and state.",
        description: "Written after the sack of Rome, Augustine's City of God defends Christianity and contrasts the earthly city (focused on self-love) with the heavenly city (focused on love of God). It offers a Christian philosophy of history and has influenced political theology and the relationship between Church and state.",
        keyConcepts: ["Two cities", "Divine providence", "Christian philosophy of history", "Church and state", "Eternal vs. temporal"],
        significance: "Influential theological and political work that shaped Christian political thought and the relationship between religious and secular authority."
    },
    {
        id: 40,
        title: "The Interior Castle",
        author: "Teresa of Ávila",
        year: "1577",
        location: "church",
        summary: "Mystical text on spiritual development and union with God.",
        description: "Teresa of Ávila's Interior Castle describes the soul's journey toward union with God using the metaphor of a castle with seven mansions. It offers practical guidance on prayer, contemplation, and spiritual growth. The work is a masterpiece of Christian mysticism and spirituality.",
        keyConcepts: ["Spiritual mansions", "Contemplative prayer", "Mystical union", "Self-knowledge", "Divine love"],
        significance: "Classic of Christian mysticism that has guided spiritual seekers for centuries and influenced contemplative practice and spiritual theology."
    },
    {
        id: 41,
        title: "The Imitation of Christ",
        author: "Thomas à Kempis",
        year: "c. 1418-1427",
        location: "church",
        summary: "Devotional guide on following Christ and spiritual life.",
        description: "The Imitation of Christ is a devotional manual offering practical guidance on Christian living, focusing on humility, obedience, and following Christ's example. It emphasizes inward spirituality over external rituals. The work has been widely read and translated, influencing Christian devotional practice.",
        keyConcepts: ["Following Christ", "Humility and obedience", "Inner life", "Detachment from world", "Spiritual discipline"],
        significance: "One of the most widely read Christian devotional works, guiding spiritual practice and personal piety for centuries across denominations."
    },
    {
        id: 42,
        title: "95 Theses",
        author: "Martin Luther",
        year: "1517",
        location: "church",
        summary: "Document challenging Catholic practices, sparking the Protestant Reformation.",
        description: "Luther's 95 Theses challenged the Catholic Church's sale of indulgences and other practices. Posted on the church door in Wittenberg, they sparked the Protestant Reformation, leading to major religious, political, and cultural changes in Europe. The document emphasized salvation by faith alone and scriptural authority.",
        keyConcepts: ["Sola fide (faith alone)", "Sola scriptura (scripture alone)", "Critique of indulgences", "Church reform", "Protestant Reformation"],
        significance: "Revolutionary document that sparked the Protestant Reformation, fundamentally reshaping Christianity, European politics, and Western culture."
    },
    {
        id: 43,
        title: "Institutes of the Christian Religion",
        author: "John Calvin",
        year: "1536",
        location: "church",
        summary: "Systematic presentation of Reformed Protestant theology.",
        description: "Calvin's Institutes is a comprehensive presentation of Reformed Protestant theology. It covers topics including God, sin, salvation, predestination, the church, and the sacraments. The work has profoundly influenced Protestant theology, particularly in Reformed and Presbyterian traditions.",
        keyConcepts: ["Sovereignty of God", "Predestination", "Total depravity", "Sola scriptura", "Reformed theology"],
        significance: "Foundational text of Reformed Protestantism, shaping Presbyterian and Reformed theology, politics, and culture worldwide."
    },
    {
        id: 44,
        title: "The Bhagavad Gita",
        author: "Vyasa (traditional attribution)",
        year: "c. 200 BCE - 200 CE",
        location: "church",
        summary: "Hindu scripture on duty, righteousness, and spiritual paths.",
        description: "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the Mahabharata epic. It consists of a dialogue between Prince Arjuna and Lord Krishna on duty, righteousness, and different paths to spiritual realization. The text has profoundly influenced Hindu philosophy and spirituality.",
        keyConcepts: ["Dharma (duty)", "Yoga paths", "Karma and action", "Devotion (bhakti)", "Self-realization"],
        significance: "Central text of Hindu philosophy and spirituality, influencing Indian culture and offering profound insights on duty, ethics, and spiritual practice."
    },
    {
        id: 45,
        title: "The Torah",
        author: "Moses (traditional attribution)",
        year: "c. 1200-500 BCE",
        location: "church",
        summary: "First five books of Hebrew Bible, foundational to Judaism.",
        description: "The Torah (also known as the Pentateuch) consists of the first five books of the Hebrew Bible: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. It contains narratives, laws, and teachings foundational to Judaism and has profoundly influenced Jewish identity, ethics, and Western civilization.",
        keyConcepts: ["Creation and covenant", "The law (mitzvot)", "Monotheism", "Chosen people", "Ethical monotheism"],
        significance: "Foundational text of Judaism, shaping Jewish identity, law, ethics, and influencing Christianity, Islam, and Western legal and moral traditions."
    },
    {
        id: 46,
        title: "The Pilgrim's Progress",
        author: "John Bunyan",
        year: "1678",
        location: "church",
        summary: "Christian allegory of the soul's journey to salvation.",
        description: "Bunyan's Pilgrim's Progress is a Christian allegory following the journey of Christian from the City of Destruction to the Celestial City. It depicts the challenges, temptations, and spiritual battles faced on the path to salvation. The work has been widely read and translated, influencing Christian literature and thought.",
        keyConcepts: ["Spiritual journey", "Allegorical narrative", "Trials and temptations", "Salvation", "Christian perseverance"],
        significance: "One of the most influential Christian allegories, widely read for centuries and shaping Protestant spirituality and English literature."
    },
    {
        id: 47,
        title: "Paradise Lost",
        author: "John Milton",
        year: "1667",
        location: "church",
        summary: "Epic poem on the fall of humanity and rebellion of Satan.",
        description: "Milton's Paradise Lost is an epic poem that retells the biblical story of the fall of humanity, Satan's rebellion, and the temptation of Adam and Eve. It explores themes of free will, obedience, pride, and redemption. The work has profoundly influenced English literature and Christian theology.",
        keyConcepts: ["Free will", "The fall of man", "Satan's rebellion", "Divine justice", "Redemption"],
        significance: "Masterpiece of English literature and Christian theology, exploring profound questions of free will, evil, and divine justice."
    },
    {
        id: 48,
        title: "The Dhammapada",
        author: "Attributed to Buddha",
        year: "c. 3rd Century BCE",
        location: "church",
        summary: "Collection of Buddhist teachings on ethics and enlightenment.",
        description: "The Dhammapada is a collection of sayings of the Buddha in verse form, covering topics including ethics, meditation, wisdom, and the path to enlightenment. It is one of the most widely read Buddhist texts and has influenced Buddhist practice and philosophy across traditions.",
        keyConcepts: ["The Middle Way", "Four Noble Truths", "Eightfold Path", "Karma", "Nirvana"],
        significance: "Beloved Buddhist text offering practical wisdom on ethics, meditation, and the path to enlightenment, influencing Buddhist practice worldwide."
    },
    {
        id: 49,
        title: "The Book of Mormon",
        author: "Joseph Smith (translator)",
        year: "1830",
        location: "church",
        summary: "Sacred text of the Latter-day Saint movement.",
        description: "The Book of Mormon is a sacred text of the Latter-day Saint movement. It narrates the history of ancient peoples in the Americas and their interactions with God. The text has been central to Mormon theology and identity and has influenced millions of believers.",
        keyConcepts: ["Ancient American prophets", "Jesus Christ in the Americas", "Restoration", "Faith and repentance", "Divine revelation"],
        significance: "Foundational scripture of the Latter-day Saint movement, shaping Mormon theology, identity, and religious practice."
    },
    {
        id: 50,
        title: "The Second Sex",
        author: "Simone de Beauvoir",
        year: "1949",
        location: "church",
        summary: "Feminist treatise analyzing women's oppression and existential freedom.",
        description: "Beauvoir's The Second Sex is a foundational feminist text that analyzes the treatment of women throughout history and argues that 'one is not born, but rather becomes, a woman.' It examines how women have been defined as 'the Other' and advocates for women's existential freedom and equality.",
        keyConcepts: ["Women as 'the Other'", "Social construction of gender", "Existential freedom", "Women's oppression", "Equality and liberation"],
        significance: "Landmark feminist work that transformed feminist theory, gender studies, and sparked the second-wave feminist movement."
    }
];

// Helper function to get writings by location
function getWritingsByLocation(location) {
    return HISTORICAL_WRITINGS.filter(writing => writing.location === location);
}

// Helper function to get random writings from a location
function getRandomWritings(location, count = 5) {
    const locationWritings = getWritingsByLocation(location);
    const shuffled = [...locationWritings].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Helper function to get writing by ID
function getWritingById(id) {
    return HISTORICAL_WRITINGS.find(writing => writing.id === id);
}
