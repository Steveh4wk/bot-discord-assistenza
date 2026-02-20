require('dotenv').config();
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  ModalBuilder,
  Partials,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
  console.error('Variabile DISCORD_TOKEN mancante. Crea un file .env partendo da .env.example.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const HELP_COMMAND = '!assistenza';
const OPEN_MODAL_BUTTON_ID = 'assistenza:open_modal';
const ASSISTENZA_MODAL_ID = 'assistenza:modal';

client.once('ready', () => {
  console.log(`Bot online come ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) {
    return;
  }

  if (message.content.trim().toLowerCase() !== HELP_COMMAND) {
    return;
  }

  const button = new ButtonBuilder()
    .setCustomId(OPEN_MODAL_BUTTON_ID)
    .setLabel('Apri modulo assistenza')
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  await message.channel.send({
    content: `${message.author}, clicca il pulsante qui sotto per compilare la richiesta di assistenza.`,
    components: [row]
  });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton() && interaction.customId === OPEN_MODAL_BUTTON_ID) {
    const modal = new ModalBuilder()
      .setCustomId(ASSISTENZA_MODAL_ID)
      .setTitle('Richiesta Assistenza');

    const nomeIcInput = new TextInputBuilder()
      .setCustomId('nome_ic')
      .setLabel('Nome IC')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(80);

    const nomeOocInput = new TextInputBuilder()
      .setCustomId('nome_ooc')
      .setLabel('Nome OOC')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(80);

    const stafferInput = new TextInputBuilder()
      .setCustomId('staffer')
      .setLabel('Staffer con cui desideri parlare (opzionale)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false)
      .setMaxLength(100);

    const motivazioneInput = new TextInputBuilder()
      .setCustomId('motivazione')
      .setLabel('Motivazione assistenza')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setMaxLength(1000);

    modal.addComponents(
      new ActionRowBuilder().addComponents(nomeIcInput),
      new ActionRowBuilder().addComponents(nomeOocInput),
      new ActionRowBuilder().addComponents(stafferInput),
      new ActionRowBuilder().addComponents(motivazioneInput)
    );

    await interaction.showModal(modal);
    return;
  }

  if (!interaction.isModalSubmit() || interaction.customId !== ASSISTENZA_MODAL_ID) {
    return;
  }

  const nomeIc = interaction.fields.getTextInputValue('nome_ic').trim();
  const nomeOoc = interaction.fields.getTextInputValue('nome_ooc').trim();
  const staffer = interaction.fields.getTextInputValue('staffer').trim();
  const motivazione = interaction.fields.getTextInputValue('motivazione').trim();

  const embed = new EmbedBuilder()
    .setColor(0x2b8a3e)
    .setTitle('Nuova Richiesta Assistenza')
    .addFields(
      { name: 'Utente Discord', value: `${interaction.user}`, inline: true },
      { name: 'Nome IC', value: nomeIc, inline: true },
      { name: 'Nome OOC', value: nomeOoc, inline: true },
      { name: 'Staffer richiesto', value: staffer || 'Non specificato', inline: false },
      { name: 'Motivazione', value: motivazione, inline: false }
    )
    .setTimestamp();

  await interaction.reply({
    content: 'Richiesta inviata correttamente.',
    ephemeral: true
  });

  await interaction.channel.send({ embeds: [embed] });
});

client.login(TOKEN);
