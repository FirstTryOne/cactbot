import Conditions from '../../../../../resources/conditions.ts';
import NetRegexes from '../../../../../resources/netregexes.js';
import Outputs from '../../../../../resources/outputs.ts';
import { Responses } from '../../../../../resources/responses.js';
import ZoneId from '../../../../../resources/zone_id.js';

// TODO: warnings for mines after bosses?

// TODO: promote something like this to Conditions?
const tankBusterOnParty = (data, matches) => {
  if (data.target === data.me)
    return true;
  if (data.role !== 'healer')
    return false;
  return data.party.inParty(data.target);
};

export default {
  zoneId: ZoneId.DelubrumReginae,
  timelineFile: 'delubrum_reginae.txt',
  triggers: [
    // *** Trinity Seeker ***
    {
      id: 'Delubrum Seeker Verdant Tempest',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5AB6', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5AB6', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5AB6', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5AB6', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Seeker Mercy Fourfold',
      // No indication which sword is which, but that's honestly for the best
      // because how would you even describe these directions.  The boss has
      // a full circle targetting circle too to only make it worse.
      // * First Mercy: 5B5D
      // * Second Mercy: 5B5E
      // * Third Mercy: 5B5F
      // * Fourth Mercy: 5B60
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5B5D', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5B5D', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5B5D', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5B5D', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get In, Watch Swords',
          de: 'Geh rein, achte auf die Schwerter',
          ko: '안으로, 검 확인',
        },
      },
    },
    {
      id: 'Delubrum Seeker Baleful Swath',
      // This is an early warning for casters for Baleful Swath on the Verdant Path cast.
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5A98', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5A98', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5A98', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5A98', capture: false }),
      response: Responses.goFrontBack('info'),
    },
    {
      id: 'Delubrum Seeker Baleful Blade Out',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5AA1', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5AA1', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5AA1', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5AA1', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get Out Behind Barricade',
          de: 'Geh raus, hinter die Barrikaden',
          ko: '밖으로, 바리케이트 뒤로',
        },
      },
    },
    {
      id: 'Delubrum Seeker Baleful Blade Knockback',
      // We could call this on Phantom Edge 5AA0, but maybe that's too early?
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5AA2', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5AA2', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5AA2', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5AA2', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get Knocked Into Barricade',
          de: 'Rückstoß in die Barrikaden',
          ko: '바리케이트로 넉백당하기',
        },
      },
    },
    {
      // There is no castbar for 5AB7, only this headmarker.
      id: 'Delubrum Seeker Merciful Arc',
      netRegex: NetRegexes.headMarker({ id: '00F3' }),
      condition: tankBusterOnParty,
      // TODO: is this a cleave?
      response: Responses.tankBuster(),
    },
    {
      id: 'Delubrum Seeker Iron Impact',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5ADB', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5ADB', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5ADB', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5ADB', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Line Stack',
          de: 'In einer Linie sammeln',
          ko: '직선 쉐어',
        },
      },
    },
    {
      id: 'Delubrum Seeker Iron Splitter',
      // Note: 5AA3 is used as starts casting for both of these abilities, but the damage
      // comes out with different ability ids.
      // Note: 5A9A is a respositioning ability, but the location data is stale and represents where
      // the boss was, and not where the boss ends up.  This is another case where knowing combatant
      // positioning data on starts casting would be a huge help.
      // TODO: we could call out directions with getCombatants? (The center appears to be 0, 278.)
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5AA3', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5AA3', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5AA3', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5AA3', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          // FIXME: this could be worded better
          en: 'Opposite Color From Boss',
          de: 'Auf die vom Boss entgegengesetze Farbe gehen',
          ko: '보스 반대 색깔',
        },
      },
    },
    {
      id: 'Delubrum Seeker Burning Chains',
      netRegex: NetRegexes.headMarker({ id: '00EE' }),
      condition: Conditions.targetIsYou(),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Chain on YOU',
          de: 'Kette auf DIR',
          ko: '사슬 대상자',
        },
      },
    },
    {
      // TODO: the FFXIV parser plugin does not include this as a "gains effect" line.
      id: 'Delubrum Seeker Burning Chains Move',
      netRegex: NetRegexes.headMarker({ id: '00EE' }),
      condition: Conditions.targetIsYou(),
      delaySeconds: 4,
      response: Responses.breakChains(),
    },
    {
      id: 'Delubrum Seeker Dead Iron',
      netRegex: NetRegexes.headMarker({ id: '00ED' }),
      condition: Conditions.targetIsYou(),
      response: Responses.earthshaker('alert'),
    },
    {
      id: 'Delubrum Seeker Seasons of Mercy',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Seeker', id: '5AAA', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Sucher', id: '5AAA', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Soudée', id: '5AAA', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・シーカー', id: '5AAA', capture: false }),
      // 5 second cast time + 2 seconds before flower appears - 1 second for reading time?
      delaySeconds: 6,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Far From Purple / Look Away From Orb',
          de: 'Weit weg von Lila / Vom Orb wegschauen',
          ko: '보라에서 떨어지기 / 구슬 바라보지 말기',
        },
      },
    },
    // *** Dahu ***
    {
      id: 'Delubrum Dahu Shockwave',
      netRegex: NetRegexes.startsUsing({ source: 'Dahu', id: ['5761', '5762'] }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Dahu', id: ['5761', '5762'] }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Dahu', id: ['5761', '5762'] }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダウー', id: ['5761', '5762'] }),
      // There's a 3s slow windup on the first, then a 1s opposite cast.
      suppressSeconds: 10,
      alertText: (data, matches, output) => {
        if (matches.id === '5761')
          return output.leftThenRight();
        return output.rightThenLeft();
      },
      outputStrings: {
        leftThenRight: {
          en: 'Left, Then Right',
          de: 'Links, dann Rechts',
          fr: 'Gauche, puis droite',
          ja: '左 => 右',
          cn: '左 => 右',
          ko: '왼쪽 => 오른쪽',
        },
        rightThenLeft: {
          en: 'Right, Then Left',
          de: 'Rechts, dann Links',
          fr: 'Droite, puis gauche',
          ja: '右 => 左',
          cn: '右 => 左',
          ko: '오른쪽 => 왼쪽',
        },
      },
    },
    {
      // TODO: is this true if you see a Feral Howl #4 and onward?
      id: 'Delubrum Dahu Feral Howl',
      netRegex: NetRegexes.startsUsing({ source: 'Dahu', id: '5755', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Dahu', id: '5755', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Dahu', id: '5755', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダウー', id: '5755', capture: false }),
      alertText: (data, _, output) => {
        if (data.seenFeralHowl)
          return output.knockbackAvoid();
        return output.knockback();
      },
      run: (data) => data.seenFeralHowl = true,
      outputStrings: {
        knockback: {
          en: 'Unavoidable Knockback',
          de: 'Unvermeidbarer Rückstoß',
          ko: '넉백 방지 불가',
        },
        knockbackAvoid: {
          // This is also unavoidable, but that's really wordy and hopefully
          // you figured that out the first time.
          en: 'Knockback (Avoid Adds)',
          de: 'Rückstoß (vermeide die Adds)',
        },
      },
    },
    {
      id: 'Delubrum Dahu Hot Charge',
      netRegex: NetRegexes.startsUsing({ source: 'Dahu', id: '5764', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Dahu', id: '5764', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Dahu', id: '5764', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダウー', id: '5764', capture: false }),
      // This happens twice in a row
      suppressSeconds: 10,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Follow Second Charge',
          de: 'Folge dem 2. Ansturm',
          ko: '두번째 돌진 따라가기',
        },
      },
    },
    {
      id: 'Delubrum Dahu Heat Breath',
      netRegex: NetRegexes.startsUsing({ source: 'Dahu', id: '5766' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Dahu', id: '5766' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Dahu', id: '5766' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダウー', id: '5766' }),
      response: Responses.tankCleave(),
    },
    {
      id: 'Delubrum Dahu Ripper Claw',
      netRegex: NetRegexes.startsUsing({ source: 'Dahu', id: '575D', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Dahu', id: '575D', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Dahu', id: '575D', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ダウー', id: '575D', capture: false }),
      response: Responses.awayFromFront('alert'),
    },
    // *** Queen's Guard ***
    {
      id: 'Delubrum Guard Secrets Revealed',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Soldier', id: '5B6E', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Soldat Der Königin', id: '5B6E', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Soldat De La Reine', id: '5B6E', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ソルジャー', id: '5B6E', capture: false }),
      infoText: (data, _, output) => {
        if (data.seenSecretsRevealed)
          return output.followUntethered();
        return output.awayFromTethered();
      },
      outputStrings: {
        awayFromTethered: {
          en: 'Away from tethered adds',
          de: 'Weg von den verbundenen Adds',
          ko: '선 연결된 쫄에서 떨어지기',
        },
        followUntethered: {
          en: 'Follow untethered adds',
          de: 'Folge den nicht verbundenen Adds',
          ko: '선 연결되지 않은 쫄 따라가기',
        },
      },
      run: (data) => data.seenSecretsRevealed = true,
    },
    {
      id: 'Delubrum Guard Rapid Sever Soldier',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Soldier', id: '5809' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Soldat Der Königin', id: '5809' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Soldat De La Reine', id: '5809' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ソルジャー', id: '5809' }),
      condition: tankBusterOnParty,
      response: Responses.tankBuster(),
    },
    {
      id: 'Delubrum Guard Blood And Bone Soldier',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Soldier', id: '5808', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Soldat Der Königin', id: '5808', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Soldat De La Reine', id: '5808', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ソルジャー', id: '5808', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Guard Shot In The Dark',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Gunner', id: '5811' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Schütze Der Königin', id: '5811' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fusilier De La Reine', id: '5811' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ガンナー', id: '5811' }),
      condition: tankBusterOnParty,
      response: Responses.tankBuster(),
    },
    {
      id: 'Delubrum Guard Automatic Turret',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Gunner', id: '580B', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Schütze Der Königin', id: '580B', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fusilier De La Reine', id: '580B', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ガンナー', id: '580B', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Avoid Laser Bounces',
          de: 'Weiche den abgelenken Lasern aus',
        },
      },
    },
    {
      id: 'Delubrum Guard Queen\'s Shot',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Gunner', id: '5810', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Schütze Der Königin', id: '5810', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fusilier De La Reine', id: '5810', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ガンナー', id: '5810', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Guard Reversal Of Forces',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Warrior', id: '57FF', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegerin Der Königin', id: '57FF', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Guerrière De La Reine', id: '57FF', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ウォリアー', id: '57FF', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Stand On Small Bomb',
          de: 'Auf kleinen Bomben stehen',
          ko: '작은 폭탄 위에 서기',
        },
      },
      run: (data) => data.reversalOfForces = true,
    },
    {
      id: 'Delubrum Guard Above Board',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Warrior', id: '57FC', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegerin Der Königin', id: '57FC', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Guerrière De La Reine', id: '57FC', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ウォリアー', id: '57FC', capture: false }),
      alertText: (data, _, output) => {
        if (data.reversalOfForces)
          return;
        return output.text();
      },
      run: (data) => delete data.reversalOfForces,
      outputStrings: {
        text: {
          en: 'Stand On Large Bomb',
          de: 'Auf großen Bomben stehen',
          ko: '큰 폭탄 위에 서기',
        },
      },
    },
    {
      id: 'Delubrum Guard Blood And Bone Warrior',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Warrior', id: '5800', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegerin Der Königin', id: '5800', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Guerrière De La Reine', id: '5800', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ウォリアー', id: '5800', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Guard Shield Omen',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Knight', id: '57F1', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ritter Der Königin', id: '57F1', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Chevalier De La Reine', id: '57F1', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ナイト', id: '57F1', capture: false }),
      response: Responses.getUnder(),
    },
    {
      id: 'Delubrum Guard Sword Omen',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Knight', id: '57F0', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ritter Der Königin', id: '57F0', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Chevalier De La Reine', id: '57F0', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ナイト', id: '57F0', capture: false }),
      response: Responses.getOut(),
    },
    {
      id: 'Delubrum Guard Rapid Sever Knight',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Knight', id: '57FB' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ritter Der Königin', id: '57FB' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Chevalier De La Reine', id: '57FB' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ナイト', id: '57FB' }),
      condition: tankBusterOnParty,
      response: Responses.tankBuster(),
    },
    {
      id: 'Delubrum Guard Blood And Bone Knight',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Knight', id: '57FA', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ritter Der Königin', id: '57FA', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Chevalier De La Reine', id: '57FA', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ナイト', id: '57FA', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    // *** Bozjan Phantom
    {
      id: 'Delubrum Phantom Weave Miasma',
      netRegex: NetRegexes.startsUsing({ source: 'Bozjan Phantom', id: '57A3', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Bozja-Phantom', id: '57A3', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fantôme Bozjien', id: '57A3', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ボズヤ・ファントム', id: '57A3', capture: false }),
      preRun: (data) => data.weaveMismaCount = (data.weaveMiasmaCount || 0) + 1,
      delaySeconds: 3,
      infoText: (data, _, output) => {
        if (data.weaveMiasmaCount && data.weaveMiasmaCount >= 3)
          return output.weaveWithKnockback();
        return output.weaveNoKnockback();
      },
      outputStrings: {
        weaveNoKnockback: {
          en: 'Go To North Circle',
          de: 'Geh zum Kreis im Norden',
          ko: '북쪽 원으로 이동',
        },
        weaveWithKnockback: {
          en: 'Get Knocked Back To Circle',
          de: 'Lass dich zum Kreis im Norden zurückstoßen',
          ko: '원으로 넉백 당하기',
        },
      },
    },
    {
      id: 'Delubrum Phantom Malediction Of Agony',
      netRegex: NetRegexes.startsUsing({ source: 'Bozjan Phantom', id: '57AF', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Bozja-Phantom', id: '57AF', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fantôme Bozjien', id: '57AF', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ボズヤ・ファントム', id: '57AF', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Phantom Undying Hatred',
      // "57AB Summon" is used here to avoid an additional name to translate.
      // "57AC Undying Hatred" is from Stuffy Wraith.
      netRegex: NetRegexes.startsUsing({ source: 'Bozjan Phantom', id: '57AB', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Bozja-Phantom', id: '57AB', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fantôme Bozjien', id: '57AB', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ボズヤ・ファントム', id: '57AB', capture: false }),
      delaySeconds: 5,
      // This is covered by Weave Miasma after the first "learn how this works" action.
      suppressSeconds: 9999,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Unavoidable Knockback',
          de: 'Unvermeidbarer Rückstoß',
          ko: '넉백 방지 불가',
        },
      },
    },
    {
      id: 'Delubrum Phantom Excruciation',
      netRegex: NetRegexes.startsUsing({ source: 'Bozjan Phantom', id: '5809' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Bozja-Phantom', id: '5809' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fantôme Bozjien', id: '5809' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'ボズヤ・ファントム', id: '5809' }),
      condition: tankBusterOnParty,
      response: Responses.tankBuster(),
    },
    // *** Trinity Avowed
    {
      id: 'Delubrum Avowed Wrath Of Bozja',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5975' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5975' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5975' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5975' }),
      response: Responses.tankCleave('alert'),
    },
    {
      id: 'Delubrum Avowed Glory Of Bozja',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5976', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5976', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5976', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5976', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Avowed Freedom Of Bozja',
      // Hot And Cold headmarkers do not show up in log lines.
      // Additionally, the Running Cold -n, Running Hot +n debuffs do not have gains effect lines.
      // Arguably, the Elemental Impact (meteor falling) has different ids depending on orb type,
      // e.g. 5960, 5962, 4F55, 4556, 4F99, 4F9A.
      // So we could give directions here, but probably that's just more confusing.
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '597C', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '597C', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '597C', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '597C', capture: false }),
      delaySeconds: 10,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Stand In Opposite Meteor',
          de: 'Steh im entgegengesetztem Meteor',
          ko: '반대쪽 메테오에 서기',
        },
      },
    },
    {
      id: 'Delubrum Avowed Shimmering Shot',
      // See comments on Freedom Of Bozja above.
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '597F', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '597F', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '597F', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '597F', capture: false }),
      delaySeconds: 3,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Go To Opposite Sword',
          de: 'Gehe in das entgegengesetzte Schwert',
          ko: '반대쪽 칼로 이동',
        },
      },
    },
    {
      // TODO: There is no gains effect line for gaining an effect.
      // We could use "suffering" and then have personal callouts here.
      // 5B65 = right cleave, heat+2
      // 5B66 = right cleave, cold+2
      // 5B67 = left cleave, heat+2
      // 5B68 = left cleave, cold+2
      // 596D = right cleave, heat+1
      // 596E = right cleave, cold+1
      // 596F = left cleave, heat+1
      // 5970 = left cleave, cold+1
      id: 'Delubrum Avowed Hot And Cold Cleaves',
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5BAF', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5BAF', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5BAF', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5BAF', capture: false }),
      delaySeconds: 3,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Be In Opposite Cleave',
          de: 'Gehe in den entgegengesetzte Cleave',
        },
      },
    },
    {
      id: 'Delubrum Avowed Unseen Eye',
      // Unseen Eye always happens before Gleaming Arrow starts casting.
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5980', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5980', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5980', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5980', capture: false }),
      delaySeconds: 6,
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Avoid Outside Add Lines',
          de: 'Weiche den äußeren Add-Laser aus',
        },
      },
    },
    {
      id: 'Delubrum Avowed Fury Of Bozja',
      // Allegiant Arsenal 5987 = staff (out), followed up with Fury of Bozja 5973
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5987', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5987', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5987', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5987', capture: false }),
      response: Responses.getOut('alert'),
    },
    {
      id: 'Delubrum Avowed Flashvane',
      // Allegiant Arsenal 5986 = bow (get behind), followed up by Flashvane 5972
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5986', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5986', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5986', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5986', capture: false }),
      response: Responses.getBehind('alert'),
    },
    {
      id: 'Delubrum Avowed Infernal Slash',
      // Allegiant Arsenal 5985 = sword (get front), followed up by Infernal Slash 5971
      netRegex: NetRegexes.startsUsing({ source: 'Trinity Avowed', id: '5985', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Trinität Der Eingeschworenen', id: '5985', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Trinité Féale', id: '5985', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'トリニティ・アヴァウド', id: '5985', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get In Front',
          de: 'Geh vor den Boss',
          ko: '정면에 서기',
        },
      },
    },
    // *** The Queen
    {
      id: 'Delubrum Queen Empyrean Iniquity',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C8', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C8', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C8', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C8', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Queen Cleansing Slash',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C5' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C5' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C5' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C5' }),
      condition: tankBusterOnParty,
      // Probably this is where you swap, but maybe that's not something you can
      // count on in an alliance raid, where there might not even be another tank.
      response: Responses.tankBuster(),
    },
    {
      id: 'Delubrum Queen Cleansing Slash Bleed',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C5' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C5' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C5' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C5' }),
      condition: (data) => data.CanCleanse(),
      delaySeconds: 5,
      infoText: (data, matches, output) => output.text({ player: data.ShortName(matches.target) }),
      outputStrings: {
        text: {
          en: 'Esuna ${player}',
          de: 'Medica ${player}',
          ko: '"${player}" 에스나',
        },
      },
    },
    {
      id: 'Delubrum Queen Northswain\'s Glow',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C3', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C3', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C3', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C3', capture: false }),
      alertText: (data, _, output) => output.text(),
      // Technically, this is "away from where the moving lines intersect each other"
      // but "away from orbs" also will do the trick here.
      outputStrings: {
        text: {
          en: 'Away from Line Intersections',
          de: 'Geh weg von den Linienkreuzungen',
          ko: '대각선에서 떨어지기',
        },
      },
    },
    {
      id: 'Delubrum Queen Automatic Turret',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Gunner', id: '59DE', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Schütze Der Königin', id: '59DE', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Fusilier De La Reine', id: '59DE', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ガンナー', id: '59DE', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Avoid Laser Bounces',
          de: 'Weiche den abgelenken Lasern aus',
        },
      },
    },
    {
      id: 'Delubrum Queen Reversal Of Forces',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Warrior', id: '59D4', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegerin Der Königin', id: '59D4', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Guerrière De La Reine', id: '59D4', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ウォリアー', id: '59D4', capture: false }),
      run: (data) => data.reversalOfForces = true,
    },
    {
      // Called during the knockback cast itself, not during the 59C6 Heaven's Wrath
      // where the knockback line appears.  This is mostly because we don't know about
      // reversal at that point.
      id: 'Delubrum Queen Heaven\'s Wrath',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C7', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C7', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C7', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C7', capture: false }),
      alertText: (data, _, output) => {
        if (!data.seenHeavensWrath)
          return output.getKnockedTowardsMiddle();
        if (data.reversalOfForces)
          return output.getKnockedToSmallBomb();
        return output.getKnockedToLargeBomb();
      },
      outputStrings: {
        getKnockedTowardsMiddle: {
          en: 'Get Knocked Towards Middle',
          de: 'Zur Mitte zurückstoßen lassen',
          ko: '중앙으로 넉백 당하기',
        },
        getKnockedToSmallBomb: {
          en: 'Get Knocked To Small Bomb',
          de: 'Zu kleinen Bomben zurückstoßen lassen',
          ko: '작은 폭탄으로 넉백당하기',
        },
        getKnockedToLargeBomb: {
          en: 'Get Knocked To Large Bomb',
          de: 'Zu großen Bomben zurückstoßen lassen',
          ko: '큰 폭탄으로 넉백당하기',
        },
      },
      run: (data) => {
        data.seenHeavensWrath = true;
        delete data.reversalOfForces;
      },
    },
    {
      id: 'Delubrum Queen Judgment Blade Right',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C2', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C2', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C2', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C2', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Find Charge, Dodge Right',
          de: 'Halte nach dem Ansturm ausschau, weiche nach rechts aus',
          ko: '돌진 찾고, 오른쪽 피하기',
        },
      },
    },
    {
      id: 'Delubrum Queen Judgment Blade Left',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C1', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C1', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C1', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C1', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Find Charge, Dodge Left',
          de: 'Halte nach dem Ansturm ausschau, weiche nach links aus',
          ko: '돌진 찾고, 왼쪽 피하기',
        },
      },
    },
    {
      id: 'Delubrum Queen Gods Save The Queen',
      netRegex: NetRegexes.startsUsing({ source: 'The Queen', id: '59C9', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Kriegsgöttin', id: '59C9', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Garde-La-Reine', id: '59C9', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'セイブ・ザ・クイーン', id: '59C9', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'Delubrum Queen Secrets Revealed',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Soldier', id: '5B8A', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Soldat Der Königin', id: '5B8A', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Soldat De La Reine', id: '5B8A', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ソルジャー', id: '5B8A', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Away from tethered adds',
          de: 'Weg von verbundenen Adds',
          ko: '선 연결된 쫄 피하기',
        },
      },
    },
    {
      id: 'Delubrum Queen Shield Omen',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Knight', id: '59CB', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ritter Der Königin', id: '59CB', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Chevalier De La Reine', id: '59CB', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ナイト', id: '59CB', capture: false }),
      delaySeconds: 2.5,
      response: Responses.getUnder('alarm'),
    },
    {
      id: 'Delubrum Queen Sword Omen',
      netRegex: NetRegexes.startsUsing({ source: 'Queen\'s Knight', id: '59CA', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Ritter Der Königin', id: '59CA', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Chevalier De La Reine', id: '59CA', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'クイーンズ・ナイト', id: '59CA', capture: false }),
      delaySeconds: 2.5,
      response: Responses.getOut('alert'),
    },
  ],
  timelineReplace: [
    {
      'locale': 'en',
      'replaceText': {
        'Right-Sided Shockwave/Left-Sided Shockwave': 'Right/Left-Sided Shockwave',
        'Left-Sided Shockwave/Right-Sided Shockwave': 'Left/Right-Sided Shockwave',
        'Sword Omen/Shield Omen': 'Sword/Shield Omen',
        'Shield Omen/Sword Omen': 'Shield/Sword Omen',
      },
    },
    {
      'locale': 'de',
      'replaceSync': {
        'Aetherial Bolt': 'Magiegeschoss',
        'Aetherial Burst': 'Magiebombe',
        'Aetherial Orb': 'Magiekugel',
        'Aetherial Ward': 'Magiewall',
        'Automatic Turret': 'Selbstschuss-Gyrocopter',
        'Avowed Avatar': 'Spaltteil der Eingeschworenen',
        'Blazing Orb': 'Feuerball',
        'Bozjan Phantom': 'Bozja-Phantom',
        'Dahu': 'Dahu',
        'Frost Arrow': 'Frostpfeil',
        'Marchosias': 'Marchosias',
        'Pride of the Lion': 'Saal des Löwen',
        'Queen\'s Gunner': 'Schütze der Königin',
        'Queen\'s Knight': 'Ritter der Königin',
        'Queen\'s Soldier': 'Soldat der Königin',
        'Queen\'s Warrior': 'Kriegerin der Königin',
        'Queensheart': 'Saal der Dienerinnen',
        'Soldier Avatar': 'Spaltteil des Soldaten',
        'Stuffy Wraith': 'muffig(?:e|er|es|en) Schrecken',
        'Swirling Orb': 'Eisball',
        'Tempestuous Orb': 'groß(?:e|er|es|en) Eisball',
        'The Hall of Hieromancy': 'Halle des Orakels',
        'The Hall of Supplication': 'Große Gebetshalle',
        'The Queen': 'Kriegsgöttin',
        'The Theater of One': 'Einsame Arena',
        'The Vault of Singing Crystal': 'Ort des Klingenden Kristalls',
        'Trinity Avowed': 'Trinität der Eingeschworenen',
        'Trinity Seeker': 'Trinität der Sucher',
      },
      'replaceText': {
        '--explosion--': '--Explosion--',
        '--knockback--': '--Rückstoß--',
        '--stunned--': '--betäubt--',
        '--unstunned--': '--nicht länger betäubt--',
        'Above Board': 'Über dem Feld',
        'Act Of Mercy': 'Schneller Stich des Dolches',
        'Allegiant Arsenal': 'Waffenwechsel',
        'Automatic Turret': 'Selbstschuss-Gyrocopter',
        'Baleful Blade': 'Stoß der Edelklinge',
        'Baleful Swathe': 'Schwarzer Wirbel der Edelklinge',
        'Beck And Call To Arms': 'Feuerbefehl',
        'Blade Of Entropy': 'Eisflammenklinge',
        'Blood And Bone': 'Wellenschlag',
        'Bombslinger': 'Bombenabwurf',
        'Cleansing Slash': 'Säubernder Schnitt',
        'Coat Of Arms': 'Trotz',
        'Creeping Miasma': 'Miasmahauch',
        'Dead Iron': 'Woge der Feuerfaust',
        'Double Gambit': 'Illusionsmagie',
        'Elemental Arrow': 'Element-Pfeil',
        'Elemental Blast': 'Element-Explosion',
        'Elemental Impact': 'Einschlag',
        'Empyrean Iniquity': 'Empyreische Interdiktion',
        'Excruciation': 'Fürchterlicher Schmerz',
        'Feral Howl': 'Wildes Heulen',
        'Firebreathe': 'Lava-Atem',
        'First Mercy': '1. Streich: Viererdolch-Haltung',
        'Flames Of Bozja': 'Bozianische Flamme',
        'Flashvane': 'Schockpfeile',
        'Fourth Mercy': '4. Streich: Viererdolch-Haltung',
        'Freedom Of Bozja': 'Bozianische Freiheit',
        'Fury Of Bozja': 'Bozianische Wut',
        'Gleaming Arrow': 'Funkelnder Pfeil',
        'Glory Of Bozja': 'Stolz von Bozja',
        'Gods Save The Queen': 'Wächtergott der Königin',
        'Head Down': 'Scharrende Hufe',
        'Heat Breath': 'Hitzeatem',
        'Heated Blast': 'Hitzekugel',
        'Heaven\'s Wrath': 'Heilige Perforation',
        'Hot And Cold': 'Heiß und kalt',
        'Hot Charge': 'Heiße Rage',
        'Hunter\'s Claw': 'Jägerklaue',
        'Infernal Slash': 'Yama-Schnitt',
        'Iron Impact': 'Kanon der Feuerfaust',
        'Iron Splitter': 'Furor der Feuerfaust',
        'Judgment Blade': 'Klinge des Urteils',
        'Left-Sided Shockwave': 'Linke Schockwelle',
        'Lots Cast': 'Magieexplosion',
        'Malediction Of Agony': 'Pochender Fluch',
        'Manipulate Miasma': 'Miasmakontrolle',
        'Merciful Arc': 'Fächertanz des Dolches',
        'Merciful Blooms': 'Kasha des Dolches',
        'Merciful Breeze': 'Yukikaze des Dolches',
        'Merciful Moon': 'Gekko des Dolches',
        'Mercy Fourfold': 'Viererdolch',
        'Northswain\'s Glow': 'Stella Polaris',
        'Optimal Play': 'Bestes Manöver',
        'Pawn Off': 'Kranzklinge',
        'Phantom Edge': 'Phantomklingen',
        'Queen\'s Edict': 'Hohes Edikt der Königin',
        'Queen\'s Justice': 'Hoheitliche Strafe',
        'Queen\'s Shot': 'Omnidirektionalschuss',
        'Queen\'s Will': 'Edikt der Königin',
        'Rapid Sever': 'Radikale Abtrennung',
        'Relentless Play': 'Koordinierter Angriff',
        'Reverberating Roar': 'Sturzimpuls',
        'Reversal Of Forces': 'Materieinversion',
        'Right-Sided Shockwave': 'Rechte Schockwelle',
        'Seasons Of Mercy': 'Setsugekka des Dolches',
        'Second Mercy': '2. Streich: Viererdolch-Haltung',
        'Secrets Revealed': 'Enthüllte Geheimnisse',
        'Shield Omen': 'Schildhaltung',
        'Shimmering Shot': 'Glitzerpfeil',
        'Shot In The Dark': 'Einhändiger Schuss',
        'Strongpoint Defense': 'Widerstand',
        'Summon': 'Beschwörung',
        'Swirling Miasma': 'Miasmawirbel',
        'Sword Omen': 'Schwerthaltung',
        'Tail Swing': 'Schwanzfeger',
        'The Ends': 'Kreuzschnitt',
        'The Means': 'Kreuzschlag',
        'Third Mercy': '3. Streich: Viererdolch-Haltung',
        'Transference': 'Transfer',
        'Turret\'s Tour': 'Querschlägerhagel',
        'Undying Hatred': 'Über-Psychokinese',
        'Unseen Eye': 'Geist des Blütensturms',
        'Verdant Path': 'Lehren des Grünen Pfades',
        'Verdant Tempest': 'Zauberwind des Grünen Pfades',
        'Vile Wave': 'Welle der Boshaftigkeit',
        'Weave Miasma': 'Miasmathese',
        'Wrath Of Bozja': 'Bozianischer Zorn',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Aetherial Bolt': 'petite bombe',
        'Aetherial Burst': 'énorme bombe',
        'Aetherial Orb': 'amas d\'éther élémentaire',
        'Aetherial Ward': 'Barrière magique',
        'Automatic Turret': 'Auto-tourelle',
        'Avowed Avatar': 'clone de la trinité féale',
        'Blazing Orb': 'boule de feu',
        'Bozjan Phantom': 'fantôme bozjien',
        'Dahu': 'dahu',
        'Frost Arrow': 'volée de flèches de glace',
        'Marchosias': 'marchosias',
        'Pride of the Lion': 'Hall du Lion',
        'Queen\'s Gunner': 'fusilier de la reine',
        'Queen\'s Knight': 'chevalier de la reine',
        'Queen\'s Soldier': 'soldat de la reine',
        'Queen\'s Warrior': 'guerrière de la reine',
        'Queensheart': 'Chambre des prêtresses',
        'Soldier Avatar': 'double de soldat',
        'Stuffy Wraith': 'spectre boursouflé',
        'Swirling Orb': 'boule de glace',
        'Tempestuous Orb': 'grande boule de glace',
        'The Hall of Hieromancy': 'Salle des oracles',
        'The Hall of Supplication': 'Grande salle des prières',
        'The Queen': 'Garde-la-Reine',
        'The Theater of One': 'Amphithéâtre en ruines',
        'The Vault of Singing Crystal': 'Chambre des cristaux chantants',
        'Trinity Avowed': 'trinité féale',
        'Trinity Seeker': 'trinité soudée',
      },
      'replaceText': {
        'Above Board': 'Aire de flottement',
        'Act Of Mercy': 'Fendreciel rédempteur',
        'Allegiant Arsenal': 'Changement d\'arme',
        'Automatic Turret': 'Auto-tourelle',
        'Baleful Blade': 'Assaut singulier',
        'Baleful Swathe': 'Flux de noirceur singulier',
        'Beck And Call To Arms': 'Ordre d\'attaquer',
        'Blade Of Entropy': 'Sabre du feu et de la glace',
        'Blood And Bone': 'Onde tranchante',
        'Bombslinger': 'Jet de bombe',
        'Cleansing Slash': 'Taillade purifiante',
        'Coat Of Arms': 'Bouclier directionnel',
        'Creeping Miasma': 'Coulée miasmatique',
        'Dead Iron': 'Vague des poings de feu',
        'Double Gambit': 'Manipulation des ombres',
        'Elemental Impact': 'Impact',
        'Empyrean Iniquity': 'Injustice empyréenne',
        'Excruciation': 'Atroce douleur',
        'Feral Howl': 'Rugissement sauvage',
        'Firebreathe': 'Souffle de lave',
        'First Mercy': 'Première lame rédemptrice',
        'Flames Of Bozja': 'Flammes de Bozja',
        'Flashvane': 'Flèches fulgurantes',
        'Fourth Mercy': 'Quatrième lame rédemptrice',
        'Freedom Of Bozja': 'Liberté de Bozja',
        'Fury Of Bozja': 'Furie de Bozja',
        'Gleaming Arrow': 'Flèche miroitante',
        'Glory Of Bozja': 'Gloire de Bozja',
        'Gods Save The Queen': 'Que les Dieux gardent la Reine',
        'Head Down': 'Charge bestiale',
        'Heat Breath': 'Souffle brûlant',
        'Heated Blast': 'Déflagration de feu',
        'Heaven\'s Wrath': 'Ire céleste',
        'Hot And Cold': 'Chaud et froid',
        'Hot Charge': 'Charge brûlante',
        'Hunter\'s Claw': 'Griffes prédatrices',
        'Infernal Slash': 'Taillade de Yama',
        'Iron Impact': 'Canon d\'ardeur des poings de feu',
        'Iron Splitter': 'Fracas des poings de feu',
        'Judgment Blade': 'Lame du jugement',
        'Left-Sided Shockwave': 'Onde de choc gauche',
        'Lots Cast': 'Bombe ensorcelée',
        'Malediction Of Agony': 'Malédiction lancinante',
        'Manipulate Miasma': 'Contrôle des miasmes',
        'Merciful Arc': 'Éventail rédempteur',
        'Merciful Blooms': 'Kasha rédempteur',
        'Merciful Breeze': 'Yukikaze rédempteur',
        'Merciful Moon': 'Gekkô rédempteur',
        'Mercy Fourfold': 'Quatuor de lames rédemptrices',
        'Northswain\'s Glow': 'Étoile du Nord',
        'Optimal Play': 'Technique de maître d\'armes',
        'Pawn Off': 'Sabre tournoyant',
        'Phantom Edge': 'Épées spectrales',
        'Queen\'s Edict': 'Injonction de Gunnhildr',
        'Queen\'s Justice': 'Châtiment royal',
        'Queen\'s Shot': 'Tir tous azimuts',
        'Queen\'s Will': 'Édit de Gunnhildr',
        'Rapid Sever': 'Tranchage rapide',
        'Relentless Play': 'Ordre d\'attaque coordonnée',
        'Reverberating Roar': 'Cri disloquant',
        'Reversal Of Forces': 'Inversion des masses',
        'Right-Sided Shockwave': 'Onde de choc droite',
        'Seasons Of Mercy': 'Setsugekka rédempteur',
        'Second Mercy': 'Deuxième lame rédemptrice',
        'Secrets Revealed': 'Corporification',
        'Shield Omen': 'Posture du bouclier',
        'Shimmering Shot': 'Flèches scintillantes',
        'Shot In The Dark': 'Tir à une main',
        'Strongpoint Defense': 'Défense absolue',
        'Summon': 'Invocation',
        'Swirling Miasma': 'Anneau miasmatique',
        'Sword Omen': 'Posture de l\'épée',
        'Tail Swing': 'Queue balayante',
        'The Ends': 'Croix lacérante',
        'The Means': 'Croix perforante',
        'Third Mercy': 'Troisième lame rédemptrice',
        'Transference': 'Transfert',
        'Turret\'s Tour': 'Ricochets frénétiques',
        'Undying Hatred': 'Psychokinèse',
        'Unseen Eye': 'Spectres de l\'ouragan de fleurs',
        'Verdant Path': 'École de la Voie verdoyante',
        'Verdant Tempest': 'Tempête de la Voie verdoyante',
        'Vile Wave': 'Vague de malveillance',
        'Weave Miasma': 'Miasmologie',
        'Wrath Of Bozja': 'Courroux de Bozja',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Aetherial Bolt': '魔弾',
        'Aetherial Burst': '大魔弾',
        'Aetherial Orb': '魔力塊',
        'Aetherial Ward': '魔法障壁',
        'Automatic Turret': 'オートタレット',
        'Avowed Avatar': 'アヴァウドの分体',
        'Blazing Orb': '炎球',
        'Bozjan Phantom': 'ボズヤ・ファントム',
        'Dahu': 'ダウー',
        'Frost Arrow': 'フロストアロー',
        'Marchosias': 'マルコシアス',
        'Pride of the Lion': '雄獅子の広間',
        'Queen\'s Gunner': 'クイーンズ・ガンナー',
        'Queen\'s Knight': 'クイーンズ・ナイト',
        'Queen\'s Soldier': 'クイーンズ・ソルジャー',
        'Queen\'s Warrior': 'クイーンズ・ウォリアー',
        'Queensheart': '巫女たちの広間',
        'Soldier Avatar': 'ソルジャーの分体',
        'Stuffy Wraith': 'スタフィー・レイス',
        'Swirling Orb': '氷球',
        'Tempestuous Orb': '大氷球',
        'The Hall of Hieromancy': '託宣所',
        'The Hall of Supplication': '大祈祷所',
        'The Queen': 'セイブ・ザ・クイーン',
        'The Theater of One': '円形劇場跡',
        'The Vault of Singing Crystal': '響き合う水晶の間',
        'Trinity Avowed': 'トリニティ・アヴァウド',
        'Trinity Seeker': 'トリニティ・シーカー',
      },
      'replaceText': {
        'Above Board': '浮遊波',
        'Act Of Mercy': '破天鋭刃風',
        'Allegiant Arsenal': 'ウェポンチェンジ',
        'Automatic Turret': 'オートタレット',
        'Baleful Blade': '豪剣強襲撃',
        'Baleful Swathe': '豪剣黒流破',
        'Beck And Call To Arms': '攻撃命令',
        'Blade Of Entropy': '氷炎刃',
        'Blood And Bone': '波動斬',
        'Bombslinger': '爆弾投擲',
        'Cleansing Slash': '乱命割殺斬',
        'Coat Of Arms': '偏向防御',
        'Creeping Miasma': '瘴気流',
        'Dead Iron': '熱拳振動波',
        'Double Gambit': '幻影術',
        'Elemental Impact': '着弾',
        'Empyrean Iniquity': '天魔鬼神爆',
        'Excruciation': '激痛',
        'Feral Howl': 'フェラルハウル',
        'Firebreathe': 'ラーヴァブレス',
        'First Mercy': '初手：鋭刃四刀の構え',
        'Flames Of Bozja': 'フレイム・オブ・ボズヤ',
        'Flashvane': 'フラッシュアロー',
        'Fourth Mercy': '四手：鋭刃四刀の構え',
        'Freedom Of Bozja': 'リバティ・オブ・ボズヤ',
        'Fury Of Bozja': 'フューリー・オブ・ボズヤ',
        'Gleaming Arrow': 'グリッターアロー',
        'Glory Of Bozja': 'グローリー・オブ・ボズヤ',
        'Gods Save The Queen': 'ゴッド・セイブ・ザ・クイーン',
        'Head Down': 'ビーストチャージ',
        'Heat Breath': '火炎の息',
        'Heated Blast': '熱気弾',
        'Heaven\'s Wrath': '聖光爆裂斬',
        'Hot And Cold': '氷炎乱流',
        'Hot Charge': 'ホットチャージ',
        'Hunter\'s Claw': 'ハンタークロウ',
        'Infernal Slash': 'ヤーマスラッシュ',
        'Iron Impact': '熱拳烈気砲',
        'Iron Splitter': '熱拳地脈爆',
        'Judgment Blade': '不動無明剣',
        'Left-Sided Shockwave': 'レフトサイド・ショックウェーブ',
        'Lots Cast': '魔爆発',
        'Malediction Of Agony': '苦悶の呪詛',
        'Manipulate Miasma': '瘴気操作',
        'Merciful Arc': '鋭刃舞踏扇',
        'Merciful Blooms': '鋭刃花車',
        'Merciful Breeze': '鋭刃雪風',
        'Merciful Moon': '鋭刃月光',
        'Mercy Fourfold': '鋭刃四刀流',
        'Northswain\'s Glow': '北斗骨砕斬',
        'Optimal Play': '武装戦技',
        'Pawn Off': '旋回刃',
        'Phantom Edge': '霊幻剣',
        'Queen\'s Edict': '女王の大勅令',
        'Queen\'s Justice': '処罰令',
        'Queen\'s Shot': '全方位射撃',
        'Queen\'s Will': '女王の勅令',
        'Rapid Sever': '滅多斬り',
        'Relentless Play': '連携命令',
        'Reverberating Roar': '崩落誘発',
        'Reversal Of Forces': '質量転換',
        'Right-Sided Shockwave': 'ライトサイド・ショックウェーブ',
        'Seasons Of Mercy': '鋭刃雪月花',
        'Second Mercy': '二手：鋭刃四刀の構え',
        'Secrets Revealed': '実体結像',
        'Shield Omen': '盾の型',
        'Shimmering Shot': 'トゥインクルアロー',
        'Shot In The Dark': '片手撃ち',
        'Strongpoint Defense': '絶対防御',
        'Summon': '召喚',
        'Swirling Miasma': '瘴気輪',
        'Sword Omen': '剣の型',
        'Tail Swing': 'テールスイング',
        'The Ends': '十字斬',
        'The Means': '十字撃',
        'Third Mercy': '三手：鋭刃四刀の構え',
        'Transference': '転移',
        'Turret\'s Tour': '跳弾乱舞',
        'Undying Hatred': '超ねんりき',
        'Unseen Eye': '花嵐の幻影',
        'Verdant Path': '翠流派',
        'Verdant Tempest': '翠流魔風塵',
        'Vile Wave': '悪意の波動',
        'Weave Miasma': '瘴気術',
        'Wrath Of Bozja': 'ラース・オブ・ボズヤ',
      },
    },
  ],
};
