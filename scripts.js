// Strict 모드 활성화
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
});

function initializeEventListeners() {
  document.getElementById('toggleCalculator').addEventListener('click', toggleElementVisibility('.bid-calculator'));
  document.getElementById('dropdownButton').addEventListener('click', toggleElementVisibility('.dropdown-menu'));
  document.getElementById('itemPrice').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      calculateBid();
    }
  });
  document.addEventListener('click', hideElementOnClickAway('.dropdown-menu'));
  document.querySelector('.dropdown-menu').addEventListener('click', (event) => event.stopPropagation());
}

function toggleElementVisibility(selector) {
  return function(event) {
    const element = document.querySelector(selector);
    element.classList.toggle('hidden');
    event?.stopPropagation();
  };
}

function hideElementOnClickAway(selector) {
  return function(event) {
    const element = document.querySelector(selector);
    if (!element.contains(event.target)) {
      element.classList.add('hidden');
    }
  };
}

async function calculateBid() {
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  const participants = parseInt(document.getElementById('participants').value);
  if (!itemPrice || !participants) {
    alert('아이템 가격과 참여인원을 입력하세요.');
    return;
  }

  const salePricePercentage = itemPrice * 0.95;
  const sharePerPerson = salePricePercentage / participants;
  const uniformDistributionPrice = salePricePercentage - sharePerPerson;
  const maxValue = uniformDistributionPrice / 1.1;

  document.getElementById('uniformDistributionPrice').textContent = uniformDistributionPrice.toFixed(0);
  document.getElementById('maxValue').textContent = maxValue.toFixed(0);
}

function showPopup(name, basicEffect, additionalEffect, elixirEffectHTML) {
    let popupContent = `<h3>${name}</h3>`;

    // basicEffect가 "정보 없음"이 아닐 경우에만 해당 내용을 추가
    if (basicEffect !== "정보 없음" && basicEffect !== undefined) {
        popupContent += `<p>기본 효과: ${basicEffect}</p>`;
    }

    // additionalEffect가 "정보 없음"이 아닐 경우에만 해당 내용을 추가
    if (additionalEffect !== "정보 없음" && additionalEffect !== undefined && additionalEffect !== "") {
        popupContent += `<p>추가 효과: ${additionalEffect}</p>`;
    }

    // elixirEffectHTML 내용이 존재하는 경우에만 해당 내용을 추가
    if (elixirEffectHTML && elixirEffectHTML !== "엘릭서 효과 없음" && elixirEffectHTML !== "각인 없습니다.") {
        popupContent += `<p>${elixirEffectHTML}</p>`;
    }

    document.getElementById('popupContent').innerHTML = popupContent;
    document.getElementById('popupContainer').style.display = 'block';
}

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'none';
});

function searchCharacter() {
    var characterName = document.getElementById('characterName').value;
    var armoriesEndpoint = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`;

    // 장비 리스트 컨테이너 초기화
    document.getElementById('equipmentList').innerHTML = '';
    var existingItemsContainer = document.querySelector('.items-container');
if (existingItemsContainer) {
    existingItemsContainer.innerHTML = '';
} else {
    itemsContainer = document.createElement('div');
    itemsContainer.className = "items-container";
    document.getElementById('equipmentList').appendChild(itemsContainer);
}
    // 캐릭터 기본 정보를 가져옴
    fetch(armoriesEndpoint, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTY2NDAifQ.pY2pJBU63yCBuphlcFGiJp9zteOBdbbwsKBYgyfmiKTqzHjqkhFS6wCv2t2NZtZ_IXbqaMY6QPS8ykhkU_2lizja8sB9BSjkZFiX9aZacEBTO-rgWhhfdCgXZ1yjHJwWqf3rvVd3G94oaF2AGpYBIx4HmHKKY36R1jC8gdv6-Zrz_J8MgbCjGC7P7NqEeAOeyxzkrCESSlPWr4pf6MfvZjvy6IBKfOtIC4sYw_qdpC6HvJtH6oSW12wxeR6Vh43R8atlqX-aMoNdmP2ST7coFqqdX-TIn4pHNLJ014NQXDbuqORDMAdHn638CuiiBLlGJkE0zzhXZGgeYae-2cdpTQ' // 보안 관련 주의 사항에 따라 수정
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayCharacterInfo(data);
        displayEquipmentInfo(data);
        displayEngravingsInfo(data);
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function displayCharacterInfo(data) {
    var characterInfoHTML = '';
    var armoriesData = data;
        var profile = armoriesData.ArmoryProfile;
        characterInfoHTML += `
        <div class="container">
            <div class="left-section">
                <img src="${profile.CharacterImage}" alt="캐릭터 이미지">
            </div>
            <div class="right-section">
                <div class="basic-info-section">
                    <p>서버 이름: <span style="font-weight: bold;">${profile.ServerName}</span></p>
                    <p>캐릭터 이름: <span style="font-weight: bold;">${profile.CharacterName}</span></p>
                    <p>캐릭터 레벨: <span style="font-weight: bold;">${profile.CharacterLevel}</span></p>
                    <p>캐릭터 클래스: <span style="font-weight: bold;">${profile.CharacterClassName}</span></p>
                    <p>아이템 평균 레벨: <span style="font-weight: bold;">${profile.ItemAvgLevel}</span></p>
                    <p>최대 아이템 레벨: <span style="font-weight: bold;">${profile.ItemMaxLevel}</span></p>
                    <p>원정대 레벨: <span style="font-weight: bold;">${profile.ExpeditionLevel}</span></p>
                    <p>PVP 등급: <span style="font-weight: bold;">${profile.PvpGradeName}</span></p>
                    <p>영지 레벨: <span style="font-weight: bold;">${profile.TownLevel}</span></p>
                    <p>영지명: <span style="font-weight: bold;">${profile.TownName}</span></p>
                    <p>칭호: <span style="font-weight: bold;">${profile.Title}</span></p>
                    <p>길드명: <span style="font-weight: bold;">${profile.GuildName ? profile.GuildName : '없음'}</span></p>
                    <p>사용 스킬 포인트: <span style="font-weight: bold;">${profile.UsingSkillPoint} / ${profile.TotalSkillPoint}</span></p>
                </div>
            </div>
            <div class="stat-section">
                ${profile.Stats.map(stat => `
                    <div class="tooltip">${stat.Type}: <span style="font-weight: bold;">${stat.Value}</span>
                        <span class="tooltiptext">${stat.Tooltip.join('<br>').replace(/"/g, '&quot;')}</span>
                    </div>
                `).join('<br>')}
                ${profile.Tendencies.map(tendency => `
                    <p>${tendency.Type}: <span style="font-weight: bold;">${tendency.Point}</span></p>
                `).join('')}
            </div>
        </div>
        `;
        document.getElementById('characterInfo').innerHTML = characterInfoHTML;
}

var itemsContainer = document.createElement('div');
itemsContainer.className = "items-container";

function displayEquipmentInfo(data){
        var equipmentData = data.ArmoryEquipment;
        const equipmentContainer = document.createElement('div');
        equipmentContainer.className = "equipment-container";
        equipmentContainer.style.flexBasis = '30%'; // flex 아이템 기본 너비 설정
        var equipmentTitle = document.createElement('h3');
        equipmentTitle.className = "equipment-title"; // 클래스 이름 추가
        equipmentTitle.textContent = "장비 정보";
        equipmentContainer.appendChild(equipmentTitle);
        
        equipmentData.forEach((equipment, i) => {
            if (i < 6) { // 처음 6개의 아이템만 처리
                let tooltipData = JSON.parse(equipment.Tooltip.replace(/\\r\\n/g, "").replace(/\\"/g, '"'));
        
                let basicEffect = tooltipData["Element_005"] ? tooltipData["Element_005"].value["Element_001"] : "정보 없음";
                let additionalEffect = tooltipData["Element_006"] ? tooltipData["Element_006"].value["Element_001"] : "정보 없음";
                let elixirEffectHTML = "엘릭서 효과 없음";
                
                if (tooltipData["Element_008"]) {
                    let elixirEffect = tooltipData["Element_008"].value["Element_000"];
                    elixirEffectHTML = `<FONT SIZE='3' COLOR='#A9D0F5'>엘릭서 효과</FONT><br>`;
                    if (elixirEffect && elixirEffect.contentStr) {
                        Object.values(elixirEffect.contentStr).forEach(effect => {
                            elixirEffectHTML += `<div><FONT color='#FFD200'>${effect.contentStr}</FONT></div>`;
                        });
                    } else {
                        elixirEffectHTML = "";
                    }
                }
        
                // 장비 아이템 DOM 요소 생성
                const equipmentItem = document.createElement('div');
                equipmentItem.className = 'equipment-item';
                equipmentItem.innerHTML = `
                    <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 30px; height: 30px;">
                    <p>${equipment.Name}</p>
                    <p>등급: ${equipment.Grade}</p>
                `;
        
                // 이벤트 리스너 추가
                equipmentItem.addEventListener('click', () => {
                    showPopup(equipment.Name, basicEffect, additionalEffect, elixirEffectHTML);
                });
        
                // 장비 아이템을 컨테이너에 추가
                equipmentContainer.appendChild(equipmentItem);
            }
            
        });
        itemsContainer.appendChild(equipmentContainer);
        // 장비 컨테이너를 페이지에 추가
        document.getElementById('equipmentList').appendChild(itemsContainer);
        
        // 액세서리 정보 섹션
        const accessoryContainer = document.createElement('div');
        accessoryContainer.className = "accessory-section";
        accessoryContainer.style.flexBasis = '30%'; // flex 아이템 기본 너비 설정
        var accessoryTitle = document.createElement('h3');
        accessoryTitle.className = "accessory-title"; // 클래스 이름 추가
        accessoryTitle.textContent = "악세서리 정보";
        accessoryContainer.appendChild(accessoryTitle);

        var equipmentData = data.ArmoryEquipment;
        equipmentData.forEach((equipment, i) => {
            if (i >= 6 && i < 13) { // 액세서리 정보 처리
                let tooltipData = JSON.parse(equipment.Tooltip.replace(/\\r\\n/g, "").replace(/\\"/g, '"').replace(/<FONT COLOR='#FFFFAC'>/g, "<FONT COLOR='#0000FF'>").replace(/emoticon_tooltip_bracelet_locked/g, "emoticon_tooltip_bracelet_locked.png").replace(/emoticon_tooltip_bracelet_changeable/g, "emoticon_tooltip_bracelet_changeable.png"));
                let basicEffect = tooltipData["Element_004"] ? tooltipData["Element_004"].value["Element_001"] : "정보 없음";
                let additionalEffect = tooltipData["Element_005"] ? tooltipData["Element_005"].value["Element_001"] : "정보 없음";
                let elixirEffectHTML = "각인 없습니다."; // 여기에서 변수 초기화

                if (tooltipData["Element_006"]) {
                    elixirEffectHTML = "<FONT SIZE='3' COLOR='#A9D0F5'>각인 효과</FONT><br>";
                    let elixirEffects = tooltipData["Element_006"].value["Element_000"];
                    if (elixirEffects && elixirEffects.contentStr) {
                        elixirEffectHTML += Object.values(elixirEffects.contentStr).map(effect => `<div><FONT color='#FFD200'>${effect.contentStr}</FONT></div>`).join('');
                    } else {
                        elixirEffectHTML = "각인 없습니다.";
                    }
                }


                // 액세서리 아이템 DOM 요소 생성
                const accessoryItem = document.createElement('div');
                accessoryItem.className = 'equipment-acc';
                accessoryItem.innerHTML = `
                    <img src="${equipment.Icon}" alt="${equipment.Name}" style="width: 30px; height: 30px;">
                    <p>${equipment.Name}</p>
                    <p>등급: ${equipment.Grade}</p>
                `;

                // 이벤트 리스너 추가
                accessoryItem.addEventListener('click', () => {
                    showPopup(equipment.Name, basicEffect, additionalEffect, elixirEffectHTML);
                });

                // 액세서리 아이템을 컨테이너에 추가
                accessoryContainer.appendChild(accessoryItem);
            }
        });
        itemsContainer.appendChild(accessoryContainer);
        // 장비 컨테이너를 페이지에 추가
        document.getElementById('equipmentList').appendChild(itemsContainer);
    }

    function parseEngravingTooltip(tooltipData) {
        let tooltipContent = "";
    
        // "Element_002"에서 각인의 상세 효과 정보를 추출
        if (tooltipData["Element_002"]) {
            tooltipContent += `<p>${tooltipData["Element_002"].value}</p>`;
        }
    
        // "Element_003"에서 레벨 별 효과 정보를 추출
        if (tooltipData["Element_003"]) {
            const levelEffects = tooltipData["Element_003"].value;
            tooltipContent += `<p>${levelEffects.Element_000}</p>`;
            tooltipContent += `<p>${levelEffects.Element_001}</p>`;
        }
    
        return tooltipContent;
    }
    
    function displayEngravingsInfo(data) {
        // `data.ArmoryEngraving.Engravings`로 경로 수정
        // 각인 정보 섹션 생성
        const engravingsContainer = document.createElement('div');
        engravingsContainer.className = 'engravings-section';
        var engravingsTitle = document.createElement('h3');
        engravingsTitle.className = "engravings-title"; // 클래스 이름 추가
        engravingsTitle.textContent = '각인 정보';
        engravingsContainer.appendChild(engravingsTitle);
    
        var engravingsinven = document.createElement('h2');
        engravingsinven.className = "engravings-inven"; // 클래스 이름 추가
        engravingsinven.textContent = '장착 각인';
        engravingsContainer.appendChild(engravingsinven);
        var engravingsData = data.ArmoryEngraving.Engravings;
        engravingsData.forEach(engraving => {
            // 각인정보 DOM 요소 생성
                const engravingsinfo = document.createElement('div');
                engravingsinfo.className = 'engravingsinfo-info';
                engravingsinfo.innerHTML = `
                    <img src="${engraving.Icon}" alt="${engraving.Name}" style="width: 30px; height: 30px;">
                    <p>${engraving.Name}</p>
                `;
                // 클릭 이벤트 리스너 추가
                engravingsinfo.addEventListener('click', () => {
                    const tooltipData = JSON.parse(engraving.Tooltip.replace(/\r\n/g, "").replace(/\\"/g, '"').replace(/<FONT COLOR='#FFFFAC'>/g, "<FONT COLOR='#0000FF'>"));
                    const tooltipContent = parseEngravingTooltip(tooltipData);
                    showPopup(engraving.Name, tooltipContent, "", "");
                });
                // 각인정보 컨테이너에 추가
                engravingsContainer.appendChild(engravingsinfo);
            }
        )
        var Effectsinven = document.createElement('h2');
        Effectsinven.className = "Effects-inven"; // 클래스 이름 추가
        Effectsinven.textContent = '전체 각인';
        engravingsContainer.appendChild(Effectsinven);
        var EffectsData = data.ArmoryEngraving.Effects;
        EffectsData.forEach(Effects => {
            // 각인 효과 DOM 요소 생성
            const Effectsinfo = document.createElement('div');
            Effectsinfo.className = 'Effectsinfo-info';
            Effectsinfo.innerHTML = `
                <img src="${Effects.Icon}" alt="${Effects.Name}" style="width: 30px; height: 30px;">
                <p>${Effects.Name}</p>
            `;
            Effectsinfo.addEventListener('click', () => {
                // 효과 설명을 직접 전달
                showPopup(Effects.Name, Effects.Description, "", ""); // 추가 효과나 엘릭서 효과가 없는 경우 빈 문자열 전달
            });
            // 각인효과 을 컨테이너에 추가
            engravingsContainer.appendChild(Effectsinfo);
        }
    )
        itemsContainer.appendChild(engravingsContainer);
        // 장비 컨테이너를 페이지에 추가
        document.getElementById('equipmentList').appendChild(itemsContainer);
    }
    
    